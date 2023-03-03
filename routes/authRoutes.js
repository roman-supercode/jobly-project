import express from "express";
const router = express.Router();

// Basic rate-limiting middleware for Express.
import rateLimiter from "express-rate-limit";

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message:
    "Too many requests from this IP address, please try again in 15 minutes",
});

import {
  register,
  login,
  updateUser,
  getCurrentUser,
  logout,
} from "../controllers/authController.js";
import authenticateUser from "../middleware/auth.js";
import testUser from "../middleware/testUser.js";

// POST Anfragen - weiterleitung an "register"
router.route("/register").post(apiLimiter, register);
// POST Anfragen - weiterleitung an "login"
router.route("/login").post(apiLimiter, login);
// GET Anfragen - weiterleitung an "logout"
router.route("/logout").get(logout);
// PATCH Anfrahen - weiterleitung an "updateUser"
router.route("/updateUser").patch(authenticateUser, testUser, updateUser);

router.route("/getCurrentUser").get(authenticateUser, getCurrentUser);

export default router;
