import { useState } from "react";
import {
  avatarValidator,
  bioValidator,
  emailValidator,
  nameValidator,
  passwordValidator,
} from "./formValidation";

const useValidation = () => {
  const [error, setError] = useState({
    password: "",
    email: "",
    name: "",
    bio: "",
    avatar: "",
    confirmPassword: "",
  });
  const [value, setValue] = useState({
    password: "",
    email: "",
    name: "",
    bio: "",
    avatar: "",
    confirmPassword: "",
  });

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setValue({ ...value, email: newEmail });
    try {
      emailValidator(newEmail);
      setError({ ...error, email: "" });
    } catch (validationError) {
      setError({ ...error, email: validationError.message });
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setValue({ ...value, password: newPassword });
    try {
      passwordValidator(newPassword);
      setError({ ...error, password: "" });
    } catch (validationError) {
      setError({ ...error, password: validationError.message });
    }
  };
  const handleConfirmPasswordChange = (e) => {
    const confirmPassword = e.target.value;
    setValue({ ...value, confirmPassword: confirmPassword });
    try {
      passwordValidator(confirmPassword);
      setError({ ...error, confirmPassword: "" });
    } catch (validationError) {
      setError({ ...error, confirmPassword: validationError.message });
    }
  };
  const handleNameChange = (e) => {
    const newName = e.target.value;
    setValue({ ...value, name: newName });
    try {
      nameValidator(newName);
      setError({ ...error, name: "" });
    } catch (validationError) {
      setError({ ...error, name: validationError.message });
    }
  };
  const handleBioChange = (e) => {
    const newBio = e.target.value;
    setValue({ ...value, bio: newBio });
    try {
      bioValidator(newBio);
      setError({ ...error, bio: "" });
    } catch (validationError) {
      setError({ ...error, bio: validationError.message });
    }
  };
  const handleAvatarChange = (e) => {
    const newAvatar = e;
    setValue({ ...value, avatar: newAvatar });
    try {
      avatarValidator(newAvatar);
      setError({ ...error, avatar: "" });
    } catch (validationError) {
      // setValue({ ...value, avatar: "" });
      setError({ ...error, avatar: validationError.message });
    }
  };
  const resetState = (...fields) => {
    setValue((prevState) => {
      const updatedState = { ...prevState };
      fields.forEach((field) => {
        updatedState[field] = "";
      });
      return updatedState;
    });
  };
  return {
    value,
    error,
    handleNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleBioChange,
    handleAvatarChange,
    resetState,
  };
};

export default useValidation;
