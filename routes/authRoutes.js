import express from "express";
const router = express.Router();

import { register, login, updateUser } from "../controllers/authController.js";
import authenticateUser from "../middleware/auth.js";

// POST Anfragen - weiterleitung an "register"
router.route("/register").post(register);
// POST Anfragen - weiterleitung an "login"
router.route("/login").post(login);
// PATCH Anfrahen - weiterleitung an "updateUser"
router.route("/updateUser").patch(authenticateUser, updateUser);

export default router;
