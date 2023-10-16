/* eslint-disable multiline-ternary */
import React from "react";

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
import Group from "./Pages/Group";
import Topic from "./Pages/Topic";
import Profile from "./Pages/Profile/";
import CreateGroup from "./Pages/CreateGroup";

import { GroupProvider } from "./Contexts/GroupContext";
import { AuthProvider } from "./Contexts/AuthContext";

interface IprivateRouteProps {
  children?: React.ReactNode;
}

const PrivateRoute = ({ children }: IprivateRouteProps) => {
  const token = Boolean(localStorage.getItem("@token"));

  return token ? children : <Navigate to="/" />;
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
                <GroupProvider>
                  <DashBoard />
                </GroupProvider>
              </PrivateRoute>
            }
          />

          <Route
            path="/group/:group_id"
            element={
              <PrivateRoute>
                <GroupProvider>
                  <Group />
                </GroupProvider>
              </PrivateRoute>
            }
          />
          <Route
            path="/topics/:group_id/:topic_id"
            element={
              <PrivateRoute>
                <GroupProvider>
                  <Topic />
                </GroupProvider>
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <AuthProvider>
                  <Profile />
                </AuthProvider>
              </PrivateRoute>
            }
          />
          <Route
            path="/create-group"
            element={
              <PrivateRoute>
                <GroupProvider>
                  <CreateGroup />
                </GroupProvider>
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
