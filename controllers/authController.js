import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";

//* REGISTRATION
const register = async (req, res) => {
  const { name, email, password } = req.body;

  // Prüfe ob alle erforderlichen Daten vorhanden sind
  if (!name || !email || !password) {
    throw new BadRequestError("please provide all values");
  }

  // Prüfe ob die Benutzer-Email bereits in der DB existiert
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError("Email already in use!");
  }

  // Erstellt einen neuen Datensatz in der DB
  const user = await User.create({ name, email, password });
  // anhand des User-Objekts wird ein JWT erstellt
  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
    },
    token,
    location: user.location,
  });
};

//* LOGIN
const login = async (req, res) => {
  const { email, password } = req.body;

  // Prüfe ob alle erforderlichen Daten vorhanden sind
  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }
  // Suche den Benutzer in der DB anhand der "email"
  // Zwecks Datensicherheit werden Passwort-Felder normalerweise ausgeschlossen!
  // die select-Methode dient dazu, das Passwort-Feld explizit aus aus der DB auszuwählen
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }
  // console.log(user);

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }

  const token = user.createJWT();
  user.password = undefined;
  res.status(StatusCodes.OK).json({ user, token, location: user.location });
  // res.send("login user");
};

const updateUser = async (req, res) => {
  const { email, name, lastName, location } = req.body;

  if (!email || !name || !lastName || !location) {
    throw new BadRequestError("Please provide all values");
  }

  const user = await User.findOne({ _id: req.user.userId });

  user.email = email;
  user.name = name;
  user.lastName = lastName;
  user.location = location;

  await user.save();

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({ user, token, location: user.location });
};

export { register, login, updateUser };
