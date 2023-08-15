import React, {
  useMemo,
  useReducer,
  createContext,
  type ReactElement,
} from "react";

import { REDUCER_ACTION_TYPE } from "./action-types";

import { type Groups, type ChildrenType } from "./interfaces";
import { reducer } from "./reducers";

const initialUserState: Groups = {
  name: "",
  administrator: { id: 0, name: "" },
  moderators: [],
  iSprivate: false,
  id: 0,
  topics: [],
  members: [],
};

export type ReducerActionType = typeof REDUCER_ACTION_TYPE;

const useGroupContext = (initialUserState: Groups) => {
  const [state, dispatch] = useReducer(reducer, initialUserState);

  const REDUCER_ACTIONS = useMemo(() => {
    return REDUCER_ACTION_TYPE;
  }, []);

  const name = state.name;
  const administrator = state.administrator;
  const moderators = state.moderators;
  const iSprivate = state.iSprivate;
  const id = state.id;
  const topics = state.topics;
  const members = state.members;

  return {
    dispatch,
    REDUCER_ACTIONS,
    name,
    administrator,
    moderators,
    iSprivate,
    id,
    topics,
    members,
  };
};

export type UseGroupContextType = ReturnType<typeof useGroupContext>;

const initialGroupContextState: UseGroupContextType = {
  dispatch: () => {},
  REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
  name: "",
  administrator: { id: 0, name: "" },
  moderators: [],
  iSprivate: false,
  id: 0,
  topics: [],
  members: [],
};

const GroupContext = createContext<UseGroupContextType>(
  initialGroupContextState
);

export const GroupProvider = ({ children }: ChildrenType): ReactElement => {
  return (
    <GroupContext.Provider value={useGroupContext(initialUserState)}>
      {children}
    </GroupContext.Provider>
  );
};

export default GroupContext;
