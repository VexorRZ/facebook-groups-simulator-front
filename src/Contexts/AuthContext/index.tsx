import React, {
  useMemo,
  useReducer,
  createContext,
  useEffect,
  type ReactElement,
} from "react";

import { REDUCER_ACTION_TYPE } from "./action-types";
import { updateUserStorage } from "./middlewares";

import { type UserType, type ChildrenType } from "./interfaces";
import { reducer } from "./reducers";

const initialUserState: UserType = {
  password: "",
  email: "",
  token: "",
  name: "",
  signed: false,
};

export type ReducerActionType = typeof REDUCER_ACTION_TYPE;

const useAuthContext = (initialUserState: UserType) => {
  const [state, dispatch] = useReducer(reducer, initialUserState);

  const REDUCER_ACTIONS = useMemo(() => {
    return REDUCER_ACTION_TYPE;
  }, []);

  const email = state.email;
  const password = state.password;
  const token = state.token;
  const name = state.name;
  const signed = state.signed;

  return { dispatch, REDUCER_ACTIONS, email, password, token, name, signed };
};

export type UseAuthContextType = ReturnType<typeof useAuthContext>;

const initialUserContextState: UseAuthContextType = {
  dispatch: () => {},
  REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
  email: "",
  password: "",
  token: "",
  name: "",
  signed: false,
};

const AuthContext = createContext<UseAuthContextType>(initialUserContextState);

export const AuthProvider = ({ children }: ChildrenType): ReactElement => {
  useEffect(() => {
    updateUserStorage();
  }, []);
  return (
    <AuthContext.Provider value={useAuthContext(initialUserState)}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
