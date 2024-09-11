import dotenv from "dotenv";

dotenv.config({
  path: "./Secret/.env",
});

export const serverPort = process.env.PORT || "8050";
export const mongoURI =
  process.env.MONGO_URI || "mongodb://localhost:27017/social";

export const smtpUserName = process.env.SMTP_USERNAME || "";
export const smtpPassword = process.env.SMTP_PASSWORD || "";
export const jwtSecret =
  process.env.JWT_SECRET || "JHGJFY%$&^65*%$*&^#(8o4YFUrhg";

export const nodeEnv = process.env.NODE_ENV || "";
export const forntendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
