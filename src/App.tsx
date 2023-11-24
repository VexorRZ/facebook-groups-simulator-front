import React, { useEffect } from "react";
import Routes from "./Routes/routes";
import GlobalStyle from "./globalStyles";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./Contexts/AuthContext";
import useAuth from "./Hooks/useAuth";
import { updateUserStorage } from "./Contexts/AuthContext/middlewares";

const App = () => {
  const { dispatch } = useAuth();

  useEffect(() => {
    updateUserStorage(dispatch);
  }, []);

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
