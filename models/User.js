import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// User-Modell
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide name"],
        minlength: 3,
        maxlength: 20,
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please provide email"],
        unique: true,

        validate: {
            validator: validator.isEmail,
            message: "Please provide a valid email"
        }
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
        minlength: 6,
        // Passwortrückgabe wird unterbunden
        select: false
    },
    lastName: {
        type: String,
        trim: true,
        maxlength: 20,
        default: "lastName"
    },
    location: {
        type: String,
        trim: true,
        maxlength: 20,
        default: "my city"
    }
});
// Mongoose-middleware-hook: vor dem "save"- Event, also vor dem Speichern des Benutzers wird
// dieser Code ausgeführt. Dabei wird ein Salt-Wert generiert, der später verwendet wird, um das Passwort des Benutzers mit dem bcryptjs.hash-Befehl zu verschlüsseln. Hierbei wird das Passwort des Benutzers mit dem Salt-Wert kombiniert und durch eine kryptographische Hashfunktion verschlüsselt. Das verschlüsselte Passwort wird dann dem Benutzer-Modell hinzugefügt, bevor es in der Datenbank gespeichert wird. So wird sichergestellt, dass das Passwort im Klartext nicht gespeichert wird.
UserSchema.pre("save", async function () {
    // console.log(this.modifiedPaths());
    // console.log(this.isModified("name"));

    // Überprüfen, ob das Passwort des Benutzers geändert wurde
    if (!this.isModified("password")) return;
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
});

// JWT wird generiert und an den Client übergeben
UserSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME });
};

// Vergleich des verschlüsselten Passworts (Rückgabe: true or false)
UserSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcryptjs.compare(candidatePassword, this.password);
    return isMatch;
};

export default mongoose.model("User", UserSchema);