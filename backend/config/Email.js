import nodemailer from "nodemailer";
import { smtpPassword, smtpUserName } from "../Secret/secret.js";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: smtpUserName,
    pass: smtpPassword,
  },
});

// async..await is not allowed in global scope, must use a wrapper
const sendMail = async (emailData) => {
  // send mail with defined transport object
  try {
    const info = await transporter.sendMail({
      from: smtpUserName, // sender address
      to: emailData.email, // list of receivers
      subject: emailData.subject, // Subject line
      html: emailData.html, // html body
    });
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log(error);
    throw error;
  }

  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
};

export default sendMail;
