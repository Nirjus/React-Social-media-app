/* eslint-disable react-refresh/only-export-components */
import { Link } from "react-router-dom";
import AuthenticationLayout from "../Authentication";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader, Mail } from "lucide-react";
import Input from "@/components/ui/Input";
import useValidation from "@/utils/validationHook";
import { useDispatch, useSelector } from "react-redux";
import { ShowAlert } from "@/components/ui/alertBox";
import { forgotPassword } from "@/redux/Actions/UserAction";
const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { value, error, handleEmailChange } = useValidation();
  const {
    error: errorMessage,
    message,
    isLoading,
  } = useSelector((state) => state.auth);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!error.email) {
      dispatch(forgotPassword({ email: value.email }));
    }
  };

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
            Forgot Password
          </h2>
          {message ? (
            <>
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 30, stiffness: 500 }}
                  className=" w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center mb-4 mx-auto"
                >
                  <Mail size={25} color="white" />
                </motion.div>
                <ul className=" px-3 list-disc text-left text-gray-300 font-light">
                  {message.split(". ").map((msg, index) => (
                    <li key={index}>{msg}</li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <form action="" onSubmit={handleSubmit}>
              <p className=" text-gray-300 mb-6 text-center">
                Enter your Email address, we&apos;ll send you password reset
                link
              </p>
              <Input
                icon={Mail}
                type="email"
                placeholder="Email address"
                value={value.email}
                onChange={handleEmailChange}
                error={error.email}
              />

              <Button
                className=" bg-indigo-500 hover:bg-indigo-600 hover:scale-95 transition shadow-lg duration-200 w-full mt-3"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader size={18} className=" animate-spin " />
                ) : (
                  "Send Reset Link"
                )}
              </Button>
            </form>
          )}
        </div>
        <div className="px-8 py-4 bg-gray-900/50 flex justify-center">
          <Link
            className=" text-indigo-400 gap-x-2 hover:underline flex items-center"
            to={"/login"}
          >
            <ArrowLeft size={18} /> Back to Login
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default AuthenticationLayout()(ForgotPassword);
