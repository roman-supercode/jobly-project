import { UnAuthenticatedError } from "../errors/index.js";
import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const testUser = payload.userId === "6401e628af2eb40996c310f7";
    req.user = { userId: payload.userId, testUser };
    // oder 👇
    // req.user = payload;
    next();
  } catch (error) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }

  // console.log(authHeader);
  // console.log("authenticate user");
};

export default auth;
