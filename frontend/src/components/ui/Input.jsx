import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const Input = ({ icon: Icon, type, onChange, value, error, placeholder }) => {
  const [visible, setVisible] = useState(false);
  return (
    <div className=" relative mb-8">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icon className="size-5 text-blue-500" />
      </div>
      <input
        type={type == "password" ? (visible ? "text" : "password") : type}
        required
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        className={cn(
          " w-full pl-10 pr-3 py-2 bg-gray-800/50 rounded-lg border border-gray-700 focus:border-blue-200 outline-none focus:ring-1 focus:ring-blue-200  text-white placeholder-gray-400 transition duration-200",
          error &&
            "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
        )}
      />
      <p className="absolute left-5 top-[45px] text-red-500 font-medium text-xs">
        {error}
      </p>
      {type == "password" && (
        <div
          className=" absolute top-3 right-3 cursor-pointer"
          onClick={() => setVisible(!visible)}
        >
          {visible ? (
            <Eye size={17} color="white" />
          ) : (
            <EyeOff size={17} color="white" />
          )}
        </div>
      )}
    </div>
  );
};

export default Input;
