/* eslint-disable @typescript-eslint/consistent-type-assertions */
import type React from "react";
import { createContext, useContext, useReducer, useRef, useState } from "react";
import { buildActions } from "./build-actions";
import { reducer } from "./reducer";

interface IContextProps {
  children?: React.ReactNode;
}

export const initialState = {
  counter: 0,
  loading: false,
};

const Context = createContext();

export const CounterContextProvider = ({ children }: IContextProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const actions = useRef(buildActions(dispatch));

  return <Context.Provider>{ children }<Context.Provider>;
};

export const useCounterContext = () => {
  const context = useContext(Context);

  if (typeof context === "undefined") {
    throw new Error(
      "You have to use useCounterContext inside <CounterContextProvider />"
    );
  }

  return [...context];
};
