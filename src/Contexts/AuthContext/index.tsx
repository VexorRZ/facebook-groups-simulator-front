import React, {
  useMemo,
  useReducer,
  createContext,
  type ReactElement,
} from "react";
import api from "../../services/api";

import { REDUCER_ACTION_TYPE } from "./action-types";

import { type UserType, type ChildrenType } from "./interfaces";
import { reducer } from "./reducers";

const initialUserState: UserType = {
  password: "",
  email: "",
  token: "",
  name: "",
  avatar_id: "",
  id: "",
};

export type ReducerActionType = typeof REDUCER_ACTION_TYPE;

const useAuthContext = (initialUserState: UserType) => {
  const [state, dispatch] = useReducer(reducer, initialUserState);

  const REDUCER_ACTIONS = useMemo(() => {
    return REDUCER_ACTION_TYPE;
  }, []);

  const userName = localStorage.getItem("@name:user");
  const userAvatar = localStorage.getItem("@avatar:user");
  const bearerToken = localStorage.getItem("@token");
  const userId = localStorage.getItem("@id:user");

  if (bearerToken && userName) {
    api.defaults.headers.authorization = `Bearer ${bearerToken}`;

    return {
      dispatch,
      ...state,
      name: userName,
      token: bearerToken,
      avatar: userAvatar,
      id: userId,
      REDUCER_ACTIONS,
    };
  }

  const email = state.email;
  const password = state.password;
  const token = state.token;
  const name = state.name;
  const avatar = state.avatar_id;
  const id = state.id;

  return {
    dispatch,
    REDUCER_ACTIONS,
    email,
    password,
    token,
    name,
    avatar,
    id,
  };
};

export type UseAuthContextType = ReturnType<typeof useAuthContext>;

const initialUserContextState: UseAuthContextType = {
  dispatch: () => {},
  REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
  email: "",
  password: "",
  token: "",
  name: "",
  avatar: "",
  id: "",
};

const AuthContext = createContext<UseAuthContextType>(initialUserContextState);

export const AuthProvider = ({ children }: ChildrenType): ReactElement => {
  return (
    <AuthContext.Provider value={useAuthContext(initialUserState)}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
