import { logoutUser } from "@/redux/Actions/UserAction";
import { clearMessage } from "@/redux/Reducers/AuthSlice";
import { LogOut } from "lucide-react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const { user, message } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
  }, [message, dispatch]);
  return (
    <div className=" w-full flex px-3 py-4 justify-between h-screen bg-fuchsia-500">
      <div className=" bg-white rounded-lg h-fit w-fit p-2">
        <p>{user.name}</p>
        <p>{user.email}</p>
      </div>
      <div
        className=" bg-white w-8 h-8 rounded-full flex cursor-pointer justify-center items-center"
        onClick={handleLogout}
      >
        <LogOut size={20} />
      </div>
    </div>
  );
};

export default Home;
