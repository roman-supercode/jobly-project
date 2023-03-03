import express from "express";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import notFoundMiddleware from "./middleware/not-found.js";
import authenticateUser from "./middleware/auth.js";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();

// imports for production build
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

import "express-async-errors";

// security packages
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";

//db and authenticaterUser
import connectDB from "./db/connect.js";

// routes
import authRouter from "./routes/authRoutes.js";
import jobsRouter from "./routes/jobsRoutes.js";

const app = express();
const PORT = process.env.PORT || 9898;

const __dirname = dirname(fileURLToPath(import.meta.url));
// only when ready to deploy
app.use(express.static(path.resolve(__dirname, "./client/build")));

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
// test Route
app.get("/", (req, res) => {
  res.json({ msg: "Welcome!" });
});
// test Route
app.get("/api/v1", (req, res) => {
  res.json({ msg: "API" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(PORT, () => {
      console.log("Server ist listening on PORT:", PORT);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
