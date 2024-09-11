import jwt from "jsonwebtoken";

export const createJWT = (payload, jwtSecret, expairy) => {
  try {
    if (typeof payload !== "object" || !payload) {
      throw new Error("Payload must be a object");
    }
    const randomKey = Math.floor(100000 + Math.random() * 900000).toString();
    let payloadObj = { ...payload, randomKey };
    const token = jwt.sign(payloadObj, jwtSecret, { expiresIn: expairy });
    return {
      token,
      randomKey,
    };
  } catch (error) {
    console.error("Error creating JWT token", error);
  }
};

export const decodeJWT = (token, jwtSecret) => {
  try {
    const result = jwt.verify(token, jwtSecret);

    return result;
  } catch (error) {
    throw new Error(error);
  }
};
