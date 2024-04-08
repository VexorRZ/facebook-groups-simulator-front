import React from "react";
import Routes from "./Routes/routes";
import GlobalStyle from "./globalStyles";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./Contexts/AuthContext";
import { GroupProvider } from "./Contexts/GroupContext";

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
