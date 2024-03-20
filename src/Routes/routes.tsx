/* eslint-disable multiline-ternary */
import React from "react";

import {
  BrowserRouter as Routing,
  Route,
  Routes as Routers,
} from "react-router-dom";
import { PublicRoutes, PrivateRoutes } from "./index";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import DashBoard from "../Pages/Dashboard";
import ForgotPassword from "../Pages/ForgotPassword";
import Group from "../Pages/Group";
import Topic from "../Pages/Topic";
import Profile from "../Pages/Profile";
import CreateGroup from "../Pages/CreateGroup";
import ResetPassword from "../Pages/ResetPassword";
import { GroupProvider } from "../Contexts/GroupContext";

const Routes = () => {
  return (
    <div>
      <Routing>
        <Routers>
          <Route
            path="/sign-up"
            element={
              <PublicRoutes>
                <SignUp />
              </PublicRoutes>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <PublicRoutes>
                <ForgotPassword />
              </PublicRoutes>
            }
          />
          <Route
            path="/reset_password/:token"
            element={
              <PublicRoutes>
                <ResetPassword />
              </PublicRoutes>
            }
          />
          <Route
            path="/"
            element={
              <PublicRoutes>
                <Login />
              </PublicRoutes>
            }
          />
          <Route
            path="/dashboard"
            element={
              <GroupProvider>
                <PrivateRoutes>
                  <DashBoard />
                </PrivateRoutes>
              </GroupProvider>
            }
          />

          <Route
            path="/group/:group_id"
            element={
              <GroupProvider>
                <PrivateRoutes>
                  <Group />
                </PrivateRoutes>
              </GroupProvider>
            }
          />
          <Route
            path="/group/:group_id/members"
            element={
              <GroupProvider>
                <PrivateRoutes>
                  <Group />
                </PrivateRoutes>
              </GroupProvider>
            }
          />
          <Route
            path="/group/:group_id/adms"
            element={
              <GroupProvider>
                <PrivateRoutes>
                  <Group />
                </PrivateRoutes>
              </GroupProvider>
            }
          />
          <Route
            path="/group/:group_id/info"
            element={
              <GroupProvider>
                <PrivateRoutes>
                  <Group />
                </PrivateRoutes>
              </GroupProvider>
            }
          />
          <Route
            path="/topics/:group_id/:topic_id"
            element={
              <GroupProvider>
                <PrivateRoutes>
                  <Topic />
                </PrivateRoutes>
              </GroupProvider>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoutes>
                <Profile />
              </PrivateRoutes>
            }
          />
          <Route
            path="/create-group"
            element={
              <GroupProvider>
                <PrivateRoutes>
                  <CreateGroup />
                </PrivateRoutes>
              </GroupProvider>
            }
          />
        </Routers>
      </Routing>
    </div>
  );
};

export default Routes;
