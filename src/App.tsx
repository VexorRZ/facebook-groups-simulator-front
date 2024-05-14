import React from "react";
import Routes from "./Routes/routes";
import GlobalStyle from "./globalStyles";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./Contexts/AuthContext";
import { GroupProvider } from "./Contexts/GroupContext";
import { GroupMembersProvider } from "./Contexts/GroupContentContext";
import { UsersProvider } from "./Contexts/UsersContext";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <AuthProvider>
        <GroupProvider>
          <UsersProvider>
            <GroupMembersProvider>
              <Routes />
            </GroupMembersProvider>
          </UsersProvider>
        </GroupProvider>
      </AuthProvider>
      <ToastContainer />
    </>
  );
};

export default App;
