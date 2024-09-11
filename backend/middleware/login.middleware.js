import { decodeJWT } from "../config/JwtToken.js";
import User from "../models/user.model.js";
import { jwtSecret } from "../Secret/secret.js";

export const isLogin = async (req, res, next) => {
  try {
    const { refresh_token } = req.cookies;
    if (!refresh_token) {
      throw new Error("Invalid credentials");
    }
    const result = decodeJWT(refresh_token, jwtSecret);
    const user = await User.findById(result._id);

    if (!user) {
      throw new Error("User not found!");
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
