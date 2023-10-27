import React from "react";
import Routes from "./routes";
import GlobalStyle from "./globalStyles";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./Contexts/AuthContext";

import "./App.css";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <AuthProvider>
        <Routes />
      </AuthProvider>
      <ToastContainer />
    </>
  );
};

export default App;
