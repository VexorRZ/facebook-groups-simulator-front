import { useContext } from "react";

import UsersContext, { type UsersContextType } from "../Contexts/UsersContext";

const useUsers = (): UsersContextType => {
  return useContext(UsersContext);
};

export default useUsers;
