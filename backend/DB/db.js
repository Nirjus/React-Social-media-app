import mongoose from "mongoose";
import { mongoURI } from "../Secret/secret.js";

const createConnection = async () => {
  try {
    await mongoose
      .connect(mongoURI)
      .then(() => {
        console.log(`databse is connected with ${mongoose.connection.host}`);
      })
      .catch((error) => {
        console.error(`Database connection erro : ${error.message}`);
      });
  } catch (error) {
    console.log(error);
  }
};

export default createConnection;
