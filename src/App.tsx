import React from "react";
import Routes from "./routes";
import GlobalStyle from "./globalStyles";
import { ToastContainer } from "react-toastify";

import "./App.css";

const App = () => {
  return (
    <>
      <GlobalStyle />

      <Routes />
      <ToastContainer />
    </>
  );
};

export default App;
