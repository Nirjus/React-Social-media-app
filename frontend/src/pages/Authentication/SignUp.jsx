/* eslint-disable react-refresh/only-export-components */
import { motion } from "framer-motion";
import { Loader, Lock, Mail, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AuthenticationLayout from "../Authentication";
import Input from "@/components/ui/Input";
import useValidation from "@/utils/validationHook";
import { Button } from "@/components/ui/button";
import { signUpUser } from "@/redux/Actions/UserAction";
import { ShowAlert } from "@/components/ui/alertBox";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { clearMessage } from "@/redux/Reducers/AuthSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    value,
    error,
    handleEmailChange,
    handlePasswordChange,
    handleNameChange,
    resetState,
  } = useValidation();
  const {
    error: errorMessage,
    isLoading,
    message,
  } = useSelector((state) => state.auth);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!error.name && !error.email && !error.password) {
      dispatch(
        signUpUser({
          name: value.name,
          email: value.email,
          password: value.password,
        })
      );
    }
  };

  useEffect(() => {
    if (message) {
      resetState("name", "email", "password");
      toast.success(message);
      dispatch(clearMessage());
      navigate("/verify-email");
    }
  }, [dispatch, message, resetState, navigate]);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full"
    >
      {errorMessage && <ShowAlert message={errorMessage} status={"error"} />}
      <div className="max-w-md w-full bg-sky-950 bg-opacity-50 backdrop-blur-xl backdrop-filter rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <h2 className=" text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-300 to-indigo-500 text-transparent bg-clip-text">
            Create Account
          </h2>
          <form action="" onSubmit={handleSubmit}>
            <Input
              icon={User}
              type="text"
              placeholder="Full Name"
              value={value.name}
              onChange={handleNameChange}
              error={error.name}
            />
            <Input
              icon={Mail}
              type="email"
              placeholder="Email address"
              value={value.email}
              onChange={handleEmailChange}
              error={error.email}
            />
            <Input
              icon={Lock}
              type="password"
              placeholder="Password"
              value={value.password}
              onChange={handlePasswordChange}
              error={error.password}
            />
            <Button
              className=" bg-indigo-500 hover:bg-indigo-600 hover:scale-95 transition duration-200 shadow-lg w-full mt-3"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader size={18} className=" animate-spin " />
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
        </div>
        <div className="px-8 py-4 bg-gray-900/50 flex justify-center">
          <p className=" text-sm text-gray-400">
            Already have an account?{" "}
            <Link className=" text-indigo-400 hover:underline" to={"/login"}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default AuthenticationLayout()(SignUp);
