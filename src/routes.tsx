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
import useAuth from "./Hooks/useAuth";

interface IprivateRouteProps {
  children?: React.ReactNode;
}

const PrivateRoutes = ({ children }: IprivateRouteProps) => {
  const { token } = useAuth();
  console.log("Token:", token);
  return token ? children : <Navigate to="/" />;
};

const Routes = () => {
  return (
    <div>
      <Routing>
        <Routers>
          <Route path="/" Component={Login} />
          <Route path="/sign-up" Component={SignUp} />
          <Route path="/forgot-password" Component={ForgotPassword} />
        </Routers>
        <PrivateRoutes>
          <Routers>
            <Route
              path="/dashboard"
              element={
                <GroupProvider>
                  <DashBoard />
                </GroupProvider>
              }
            />

            <Route
              path="/group/:group_id"
              element={
                <GroupProvider>
                  <Group />
                </GroupProvider>
              }
            />
            <Route
              path="/topics/:group_id/:topic_id"
              element={
                <GroupProvider>
                  <Topic />
                </GroupProvider>
              }
            />
            <Route
              path="/profile"
              element={
                <AuthProvider>
                  <Profile />
                </AuthProvider>
              }
            />
            <Route
              path="/create-group"
              element={
                <GroupProvider>
                  <CreateGroup />
                </GroupProvider>
              }
            />
          </Routers>
        </PrivateRoutes>
      </Routing>
    </div>
  );
};

export default Routes;
