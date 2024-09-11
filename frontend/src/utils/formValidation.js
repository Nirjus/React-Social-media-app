export const nameValidator = (name) => {
  try {
    if (!name) throw Error("Name is required");
    if (name.length < 3) throw Error("Name must be 3 character long");
    if (name.length > 30) throw Error("Name must be less than 30 character");
    if (name.startsWith("_"))
      throw Error("name can not be starts with underscore");
    if (name.startsWith("/")) throw Error("Name can not contain slash");
    if (!/^[a-zA-Z0-9_ ]+$/.test(name))
      throw Error("name only contains letters, number and underscore");
    return true;
  } catch (error) {
    throw Error(error.message);
  }
};

export const passwordValidator = (password) => {
  try {
    if (!password) throw Error("Password is required");
    if (password.length < 6)
      throw Error("Password length must be atlist 6 character");
    if (!/[a-z]/.test(password)) {
      throw Error("Password must contain at least one lowercase letter.");
    }
    if (!/[A-Z]/.test(password)) {
      throw Error("Password must contain at least one uppercase letter.");
    }
    if (!/[0-9]/.test(password)) {
      throw Error("Password must contain at least one number.");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      throw Error("Password must contain at least one special character.");
    }
    return true;
  } catch (error) {
    throw Error(error.message);
  }
};

export const emailValidator = (email) => {
  try {
    if (!email) throw Error("Email is required");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw Error("Please enter a valid email address.");
    }
    return true;
  } catch (error) {
    throw Error(error.message);
  }
};

export const bioValidator = (bio) => {
  try {
    if (bio.length < 3) {
      throw Error("Please add a meningfull bio");
    }
    return true;
  } catch (error) {
    throw Error(error.message);
  }
};

export const avatarValidator = (image) => {
  try {
    // Check if the file is provided
    if (!image) {
      throw new Error("No file provided.");
    }

    // Get the file type and size
    const { type, size } = image;

    // Define allowed file types
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/svg+xml",
    ];

    // Check the file type
    if (!allowedTypes.includes(type)) {
      throw new Error(
        "Invalid file type. Only JPEG, JPG, and PNG are allowed."
      );
    }

    // Check the file size (must be under 5MB)
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
    if (size > maxSizeInBytes) {
      throw new Error("File size must be under 5MB.");
    }

    // If everything is fine
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};
