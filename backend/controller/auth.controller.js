import ejs from "ejs";
import path from "path";
import bcryptjs from "bcryptjs";
import sendMail from "../config/Email.js";
import { createJWT, decodeJWT } from "../config/JwtToken.js";
import {
  emailValidator,
  nameValidator,
  passwordValidator,
} from "../config/validation.js";
import User from "../models/user.model.js";
import { forntendUrl, jwtSecret, nodeEnv } from "../Secret/secret.js";

export const onBoarding = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    emailValidator(email);
    nameValidator(name);
    passwordValidator(password);
    const user = await User.exists({ email: email });
    if (user) {
      throw new Error(
        "user already exists with this email, please login to continue"
      );
    }
    const payload = { name, password, email };
    const jwtToken = createJWT(payload, jwtSecret, "5m");
    const html = await ejs.renderFile(
      path.join(process.cwd(), "emailTemplate/Activation.ejs"),
      {
        name,
        activationCode: jwtToken.randomKey,
        expire: "5 minite",
      }
    );
    const emailData = {
      email: email,
      subject: "Account creation email",
      html: html,
    };
    await sendMail(emailData);

    return res.status(200).json({
      success: true,
      message: `Please check you email: ${email} to complete registration process`,
      secureCode: jwtToken.token,
    });
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const { jwtDecode, randomKey } = req.body;

    const result = decodeJWT(jwtDecode, jwtSecret);

    const user = await User.exists({ email: result.email });
    if (user) {
      throw new Error(
        "user already exists with this email, please login to continue"
      );
    }
    if (randomKey !== result.randomKey) {
      throw new Error("OTP is not verified, please enter correct OTP");
    }
    await User.create({
      name: result.name,
      email: result.email,
      password: result.password,
    });
    const html = await ejs.renderFile(
      path.join(process.cwd(), "emailTemplate/Welcome-Email.ejs"),
      {
        name: result.name,
      }
    );
    const emailData = {
      subject: "Account creation successfull",
      email: result.email,
      html: html,
    };
    await sendMail(emailData);
    return res.status(201).json({
      success: true,
      message: `user register successfully`,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    emailValidator(email);
    passwordValidator(password);

    const user = await User.findOne({ email: email }).select("+password");
    if (!user) {
      throw new Error("user not found");
    }

    const checkedPassword = await bcryptjs.compare(password, user.password);
    if (!checkedPassword) {
      throw new Error("Please enter a correct password");
    }
    const token = createJWT({ _id: user._id }, jwtSecret, "1d");

    res.cookie("refresh_token", token.token, {
      expires: 1 * 24 * 60 * 60 * 1000,
      maxAge: 1 * 24 * 60 * 60 * 1000,
      secure: true,
      httpOnly: true,
      sameSite: "none",
    });
    // Remove password before sending the response
    const userObj = user.toObject();
    delete userObj.password;
    return res.status(200).json({
      success: true,
      message: "Login successfull",
      user: userObj,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("refresh_token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfull",
    });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    emailValidator(email);
    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("User not exists with this email");
    }
    const jwtToken = createJWT({ _id: user._id }, jwtSecret, "5m");
    const html = await ejs.renderFile(
      path.join(process.cwd(), "emailTemplate/Password-Recovery-email.ejs"),
      {
        name: user.name,
        resetLink: `${forntendUrl}/reset-password/${jwtToken.token}`,
        expire: "5 minite",
      }
    );

    const emailData = {
      subject: "Password recovery email",
      email: email,
      html: html,
    };

    await sendMail(emailData);

    return res.status(200).json({
      success: true,
      message: `check your email: ${email} for password recovery. Link will be expired after 5 minites`,
    });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { newPassword, confirmPassword } = req.body;
    if (!token) {
      throw new Error("Token not found");
    }
    const decoded = decodeJWT(token, jwtSecret);

    passwordValidator(newPassword);
    passwordValidator(confirmPassword);

    if (newPassword !== confirmPassword) {
      throw new Error("Confirm password not matched!");
    }

    const updatedUser = await User.findByIdAndUpdate(
      decoded._id,
      {
        password: confirmPassword,
      },
      { new: true }
    );
    if (!updatedUser) {
      throw new Error("Password not updated, error occured");
    }
    const html = await ejs.renderFile(
      path.join(process.cwd(), "emailTemplate/Password-Reset-email.ejs"),
      { name: updatedUser.name }
    );

    const emailData = {
      subject: "Password Reset successfull",
      email: updatedUser.email,
      html: html,
    };

    await sendMail(emailData);

    return res.status(201).json({
      success: true,
      message: "Password updated, now try to login",
    });
  } catch (error) {
    next(error);
  }
};
