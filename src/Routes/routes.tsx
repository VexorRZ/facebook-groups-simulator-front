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
// import { GroupProvider } from "./Contexts/GroupContext";

const Routes = () => {
  return (
    <div>
      <Routing>
        <Routers>
          <Route
            path="/sign-up"
            element={
              <PublicRoutes>
                <ForgotPassword />
              </PublicRoutes>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <PublicRoutes>
                <SignUp />
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
              <PrivateRoutes>
                <DashBoard />
              </PrivateRoutes>
            }
          />

          <Route
            path="/group/:group_id"
            element={
              <PrivateRoutes>
                <Group />
              </PrivateRoutes>
            }
          />
          <Route
            path="/topics/:group_id/:topic_id"
            element={
              <PrivateRoutes>
                <Topic />
              </PrivateRoutes>
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
              <PrivateRoutes>
                <CreateGroup />
              </PrivateRoutes>
            }
          />
        </Routers>
      </Routing>
    </div>
  );
};

export default Routes;
