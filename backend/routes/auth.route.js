import { Router } from "express";
import {
  forgotPassword,
  login,
  logout,
  onBoarding,
  register,
  resetPassword,
} from "../controller/auth.controller.js";

const authRouter = Router();

authRouter.post("/signUp", onBoarding);
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/forgot-password", forgotPassword);
authRouter.put("/reset-password/:token", resetPassword);

export default authRouter;
