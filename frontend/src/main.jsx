// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import Store from "./redux/Store.js";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={Store}>
    <App />
    <Toaster toastOptions={{ duration: 5000 }} />
  </Provider>
  // </StrictMode>
);
