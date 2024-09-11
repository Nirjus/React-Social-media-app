/* eslint-disable react-refresh/only-export-components */
import AuthenticationLayout from "@/pages/Authentication";
import { Loader2 } from "lucide-react";

const LoaderSpinner = () => {
  return (
    <div className=" min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-transparent bg-opacity-90">
      <Loader2 size={40} className=" text-cyan-500 animate-spin" />
    </div>
  );
};

export default AuthenticationLayout()(LoaderSpinner);
