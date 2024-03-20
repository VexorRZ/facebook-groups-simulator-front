import React, {
  useMemo,
  useReducer,
  createContext,
  type ReactElement,
} from "react";

import { REDUCER_ACTION_TYPE } from "./action-types";
import {
  asyncCreateGroup,
  asyncCreateRequest,
  asyncGetGroupMembers,
} from "./middlewares";

import { type Groups, type ChildrenType } from "./interfaces";
import { reducer } from "./reducers";

const initialUserState: Groups = {
  name: "",
  administrator: { id: 0, name: "" },
  moderators: [],
  is_private: false,
  id: 0,
  topics: [],
  members: [],
  navigateAvailable: false,
  avatar: {
    id: "",
    path: "",
  },
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
  const is_private = state.is_private;
  const id = state.id;
  const topics = state.topics;
  const members = state.members;
  const avatar = state.avatar;
  const navigateAvailable = state.navigateAvailable;

  return {
    dispatch,
    asyncCreateGroup,
    asyncCreateRequest,
    asyncGetGroupMembers,
    REDUCER_ACTIONS,
    name,
    administrator,
    moderators,
    is_private,
    id,
    topics,
    members,
    avatar,
    navigateAvailable,
  };
};

export type UseGroupContextType = ReturnType<typeof useGroupContext>;

const initialGroupContextState: UseGroupContextType = {
  dispatch: () => {},
  asyncCreateGroup,
  asyncCreateRequest,
  asyncGetGroupMembers,
  REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
  name: "",
  administrator: { id: 0, name: "" },
  moderators: [],
  is_private: false,
  id: 0,
  topics: [],
  members: [],
  navigateAvailable: false,
  avatar: {
    id: "",
    path: "",
  },
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
