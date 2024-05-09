import React, {
  useMemo,
  useReducer,
  createContext,
  type ReactElement,
} from "react";
import api from "../../services/api";

import {
  asyncLoginFn,
  asyncChangeAvatar,
  forgotPassword,
  resetPassword,
  recoverPassword,
  asyncRequestDeleteAccount,
} from "./middlewares";

import { REDUCER_ACTION_TYPE } from "./action-types";

import { type UserType, type ChildrenType } from "./interfaces";
import { reducer } from "./reducers";

const initialUserState: UserType = {
  password: "",
  email: "",
  token: "",
  name: "",
  avatar: {
    id: "",
    path: "",
  },
  id: "",
};

export type ReducerActionType = typeof REDUCER_ACTION_TYPE;

const useAuthContext = (initialUserState: UserType) => {
  const [state, dispatch] = useReducer(reducer, initialUserState);

  const REDUCER_ACTIONS = useMemo(() => {
    return REDUCER_ACTION_TYPE;
  }, []);

  const user = window.localStorage.getItem("@user");

  if (user) {
    let userData = JSON.parse(user) as UserType;

    if (userData.token) {
      api.defaults.headers.authorization = `Bearer ${userData.token}`;
    }

    return {
      dispatch,
      asyncLoginFn,
      asyncChangeAvatar,
      forgotPassword,
      resetPassword,
      recoverPassword,
      asyncRequestDeleteAccount,
      REDUCER_ACTIONS,
      userData,
    };
  }

  let userData = {} as UserType;

  userData = state;
  return {
    dispatch,
    asyncLoginFn,
    asyncChangeAvatar,
    forgotPassword,
    resetPassword,
    recoverPassword,
    asyncRequestDeleteAccount,
    REDUCER_ACTIONS,
    userData,
  };
};

export type UseAuthContextType = ReturnType<typeof useAuthContext>;

const initialUserContextState: UseAuthContextType = {
  dispatch: () => {},
  asyncLoginFn,
  asyncChangeAvatar,
  forgotPassword,
  resetPassword,
  recoverPassword,
  asyncRequestDeleteAccount,
  REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
  userData: {
    password: "",
    email: "",
    token: "",
    name: "",
    avatar: {
      id: "",
      path: "",
    },
    id: "",
  },
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
