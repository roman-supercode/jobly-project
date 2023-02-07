import { UnAuthenticatedError } from "../errors/index.js";
import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    // check header
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        throw new UnAuthenticatedError("Authentication Invalid");
    }

    const token = authHeader.split(" ")[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(payload);
        req.user = { userId: payload.userId };
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