import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./Contexts/AuthContext";
import { GroupProvider } from "./Contexts/GroupContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <GroupProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </GroupProvider>
);
