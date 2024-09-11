import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import UserProtected from "./Hooks/useAuthenticate";
import { getProfile } from "./redux/Actions/UserAction";
import LoaderSpinner from "./components/shapes/LoaderSpinner";

const Home = lazy(() => import("./pages/Home"));
const SignUp = lazy(() => import("./pages/Authentication/SignUp"));
const Login = lazy(() => import("./pages/Authentication/Login"));
const ForgotPassword = lazy(() =>
  import("./pages/Authentication/ForgotPassword")
);
const ResetPassword = lazy(() =>
  import("./pages/Authentication/reset-password")
);
const VeryfyEmail = lazy(() => import("./pages/Authentication/VeryfyEmail"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Suspense fallback={<LoaderSpinner />}>
        <Routes>
          <Route element={<UserProtected user={!user} redirect="/" />}>
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/verify-email" element={<VeryfyEmail />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
          </Route>
          <Route element={<UserProtected user={user} />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
