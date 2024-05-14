import React, {
  useMemo,
  useReducer,
  createContext,
  type ReactElement,
} from "react";

import { asyncLoadUsers } from "./middlewares";

import { REDUCER_ACTION_TYPE } from "./action-types";

import { type Users, type ChildrenType } from "./interfaces";
import { reducer } from "./reducers";

const initialUsersState: Users = {
  email: "",
  name: "",
  avatar: {
    id: "",
    path: "",
  },
  id: "",
};

export type ReducerActionType = typeof REDUCER_ACTION_TYPE;

const usersContext = (initialUsersState: Users) => {
  const [state, dispatch] = useReducer(reducer, initialUsersState);

  const REDUCER_ACTIONS = useMemo(() => {
    return REDUCER_ACTION_TYPE;
  }, []);

  let usersData = {} as Users;

  usersData = state;
  return {
    dispatch,
    asyncLoadUsers,
    REDUCER_ACTIONS,
    usersData,
  };
};

export type UsersContextType = ReturnType<typeof usersContext>;

const initialUsersContextState: UsersContextType = {
  dispatch: () => {},

  asyncLoadUsers,
  REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
  usersData: {
    email: "",
    name: "",
    avatar: {
      id: "",
      path: "",
    },
    id: "",
  },
};

const AuthContext = createContext<UsersContextType>(initialUsersContextState);

export const UsersProvider = ({ children }: ChildrenType): ReactElement => {
  return (
    <AuthContext.Provider value={usersContext(initialUsersState)}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
