import React, {
  useMemo,
  useReducer,
  createContext,
  useEffect,
  type ReactElement,
} from "react";

import { REDUCER_ACTION_TYPE } from "./action-types";
import { updateUserStorage } from "./middlewares";

import { type UserType, type ChildrenType } from "./Interfaces";
import { reducer } from "./reducer";

const initialUserState: UserType = {
  password: "",
  email: "",
  token: "",
  name: "",
};

export type ReducerActionType = typeof REDUCER_ACTION_TYPE;

const useCartContext = (initialUserState: UserType) => {
  const [state, dispatch] = useReducer(reducer, initialUserState);

  const REDUCER_ACTIONS = useMemo(() => {
    return REDUCER_ACTION_TYPE;
  }, []);

  const email = state.email;
  const password = state.password;
  const token = state.token;
  const name = state.name;

  return { dispatch, REDUCER_ACTIONS, email, password, token, name };
};

export type UseCartContextType = ReturnType<typeof useCartContext>;

const initialUserContextState: UseCartContextType = {
  dispatch: () => {},
  REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
  email: "",
  password: "",
  token: "",
  name: "",
};

const AuthContext = createContext<UseCartContextType>(initialUserContextState);

export const CartProvider = ({ children }: ChildrenType): ReactElement => {
  useEffect(() => {
    updateUserStorage();
  }, []);
  return (
    <AuthContext.Provider value={useCartContext(initialUserState)}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
