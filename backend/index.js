import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import { forntendUrl } from "./Secret/secret.js";

const App = express();

App.use(morgan("dev"));
App.use(
  cors({
    origin: [forntendUrl],
    credentials: true,
  })
);
App.use(express.json());
App.use(express.urlencoded({ extended: true }));
App.use(cookieParser());

App.get("/test", (req, res) => {
  return res.send("Backend is running");
});

App.use("/api/auth", authRouter);
App.use("/api/user", userRouter);

App.use((error, req, res, next) => {
  return res.status(error.status || 500).send({
    success: false,
    message: error.message,
  });
});

export default App;
