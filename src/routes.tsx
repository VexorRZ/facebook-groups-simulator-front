/* eslint-disable multiline-ternary */
import React from "react";
// import useAuth from "./Hooks/useAuth";

import {
  BrowserRouter as Routing,
  Route,
  Routes as Routers,
  Navigate,
} from "react-router-dom";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import DashBoard from "./Pages/Dashboard";
import ForgotPassword from "./Pages/ForgotPassword";

interface IprivateRouteProps {
  children?: React.ReactNode;
}

const PrivateRoute = ({ children }: IprivateRouteProps) => {
  const signed = Boolean(localStorage.getItem("@signed"));

  return signed ? children : <Navigate to="/" />;
};

const Routes: React.FC = () => {
  return (
    <div>
      <Routing>
        <Routers>
          <Route path="/" Component={Login} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashBoard />
              </PrivateRoute>
            }
          />
          <Route path="/sign-up" Component={SignUp} />
          <Route path="/forgot-password" Component={ForgotPassword} />
        </Routers>
      </Routing>
    </div>
  );
};

export default Routes;
