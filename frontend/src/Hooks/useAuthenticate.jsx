import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { clearMessage } from "@/redux/Reducers/AuthSlice";

const UserProtected = ({ children, user, redirect = "/login" }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch, location]);

  if (!user) return <Navigate to={redirect} />;
  return children ? children : <Outlet />;
};

export default UserProtected;
