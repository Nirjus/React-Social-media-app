/* eslint-disable react-refresh/only-export-components */
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AuthenticationLayout from "../Authentication";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { ShowAlert } from "@/components/ui/alertBox";
import toast from "react-hot-toast";
import { registerUser } from "@/redux/Actions/UserAction";
import { clearMessage } from "@/redux/Reducers/AuthSlice";

const OTP_LENGTH = 6;

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const [code, setCode] = useState(Array(OTP_LENGTH).fill(""));
  const inputRef = useRef([]);
  const { secureCode } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { isLoading, error, message } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    if (verificationCode.length === 6) {
      dispatch(
        registerUser({ jwtDecode: secureCode, randomKey: verificationCode })
      );
    }
  };

  const handleInputChange = (index, value) => {
    const newCode = [...code];
    newCode[index] = value[0] || ""; // Only the first character of input is used
    setCode(newCode);

    // Focus on the next input field if value is entered
    if (value && index < OTP_LENGTH - 1) {
      inputRef.current[index + 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault(); // Prevent default paste behavior
    const pasteData = e.clipboardData.getData("text").slice(0, OTP_LENGTH); // Get up to OTP_LENGTH characters

    const newCode = pasteData.split(""); // Split pasted data into characters
    for (let i = 0; i < OTP_LENGTH; i++) {
      code[i] = newCode[i] || ""; // Assign characters to the respective inputs
    }

    setCode([...code]);

    // Focus on the next input or stay on the last one if full
    inputRef.current[Math.min(pasteData.length, OTP_LENGTH - 1)].focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRef.current[index - 1].focus(); // Move focus to the previous input
    }
  };

  useEffect(() => {
    if (!secureCode) {
      navigate("/signUp", { replace: true });
    }
  }, [navigate, secureCode]);

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
      navigate("/");
    }
  }, [dispatch, message, navigate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full"
    >
      {error && <ShowAlert message={error} status={"error"} />}
      <div className=" flex items-center space-x-5 p-2 bg-yellow-800/40 backdrop-blur-xl backdrop-filter rounded-lg shadow-xl overflow-hidden mb-2 ">
        <AlertTriangle size={20} className=" text-yellow-500 ml-2" />
        <div className=" space-y-2">
          <p className=" text-sm text-yellow-500">
            Dont refresh the page manually.
          </p>
          <p className=" text-sm text-yellow-500">
            Token will expaire withen 5 minites.
          </p>
        </div>
      </div>
      <div className="max-w-md w-full bg-sky-950 bg-opacity-50 backdrop-blur-xl backdrop-filter rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-300 to-indigo-500 text-transparent bg-clip-text">
            Verify your Email
          </h2>
          <p className="text-center text-gray-300 mb-6">
            Enter the 6-digit code sent to your email address.
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex justify-between">
              {code.map((digit, index) => (
                <input
                  type="text"
                  key={index}
                  ref={(el) => (inputRef.current[index] = el)}
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste} // Add paste event listener here
                  className={cn(
                    "outline-none w-12 h-12 text-center text-2xl font-bold bg-gray-800/50 text-white border-2 border-gray-700 rounded-lg focus:border-blue-200 focus:ring-1 focus:ring-blue-200 placeholder-gray-400 transition duration-200"
                  )}
                />
              ))}
            </div>
            <Button
              className="bg-indigo-500 hover:bg-indigo-600 hover:scale-95 transition shadow-lg duration-200 w-full"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Verifying..." : "Login"}
            </Button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default AuthenticationLayout()(VerifyEmail);
