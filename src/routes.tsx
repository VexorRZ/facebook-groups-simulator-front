import React from "react";
import {
  BrowserRouter as Routing,
  Route,
  Routes as Routers,
} from "react-router-dom";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import DashBoard from "./Pages/Dashboard";
import ForgotPassword from "./Pages/ForgotPassword";

const Routes: React.FC = () => {
  return (
    <div>
      <Routing>
        <Routers>
          <Route path="/" Component={Login} />
          <Route path="/sign-up" Component={SignUp} />
          <Route path="/forgot-password" Component={ForgotPassword} />
          <Route path="/dashboard" Component={DashBoard} />
        </Routers>
      </Routing>
    </div>
  );
};

export default Routes;
