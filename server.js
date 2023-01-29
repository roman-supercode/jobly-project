import express from "express";
// import cors from "cors";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import notFoundMiddleware from "./middleware/not-found.js";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();

import "express-async-errors";

//db and authenticaterUser
import connectDB from "./db/connect.js";

// routes
import authRouter from "./routes/authRoutes.js";
import jobsRouter from "./routes/jobsRoutes.js";

const app = express();
const PORT = process.env.PORT || 9898;


// middleware
// app.use(cors());
app.use(express.json());
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
app.use("/api/v1/jobs", jobsRouter);

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