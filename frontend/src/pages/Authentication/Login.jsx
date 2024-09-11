/* eslint-disable react-refresh/only-export-components */
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Loader, Lock, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import AuthenticationLayout from "../Authentication";
import Input from "@/components/ui/Input";
import useValidation from "@/utils/validationHook";
import { loginUser } from "@/redux/Actions/UserAction";
import { clearMessage } from "@/redux/Reducers/AuthSlice";
import { ShowAlert } from "@/components/ui/alertBox";
import toast from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();
  const { value, error, handleEmailChange, handlePasswordChange, resetState } =
    useValidation();
  const {
    error: errorMessage,
    isLoading,
    message,
  } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!error.email && !error.password) {
      dispatch(loginUser({ email: value.email, password: value.password }));
    }
  };

  useEffect(() => {
    if (message) {
      dispatch(clearMessage());
      toast.success(message);
      resetState("email", "password");
    }
  }, [dispatch, message, resetState]);

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
            Welcome Back
          </h2>
          <form action="" onSubmit={handleSubmit}>
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

            <div className=" w-full px-4 mb-4 mt-[-5px]">
              <Link
                to={"/forgot-password"}
                className=" text-sm text-indigo-400 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <Button
              className=" bg-indigo-500 hover:bg-indigo-600 hover:scale-95 transition shadow-lg duration-200 w-full mt-3"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader size={18} className=" animate-spin " />
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </div>
        <div className="px-8 py-4 bg-gray-900/50 flex justify-center">
          <p className=" text-sm text-gray-400">
            Dont have any account?{" "}
            <Link className=" text-indigo-400 hover:underline" to={"/signUp"}>
              SignUp
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default AuthenticationLayout()(Login);
