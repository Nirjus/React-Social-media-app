import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Reducers/AuthSlice";

const Store = configureStore({
  reducer: {
    auth: AuthSlice,
  },
});

export default Store;
