import { Router } from "express";
import { isLogin } from "../middleware/login.middleware.js";
import { myProfile } from "../controller/user.controller.js";

const userRouter = Router();

userRouter.get("/me", isLogin, myProfile);

export default userRouter;
