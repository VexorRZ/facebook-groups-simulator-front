import React, {
  useMemo,
  useReducer,
  createContext,
  type ReactElement,
} from "react";

import { REDUCER_ACTION_TYPE } from "./action-types";
import { asyncGetGroupMembers } from "./middlewares";

import { type Group, type ChildrenType } from "./interfaces";
import { reducers } from "./reducers";

const initialMembersState: Group = {
  name: "",
  administrator: { id: 0, name: "", avatar: { id: "", path: "" } },
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

const useGroupContext = (initialMembersState: Group) => {
  const [state, membersDispatch] = useReducer(reducers, initialMembersState);

  const REDUCER_ACTIONS = useMemo(() => {
    return REDUCER_ACTION_TYPE;
  }, []);

  const members = window.localStorage.getItem("members");

  if (members) {
    let membersData = JSON.parse(members) as Group;

    return {
      membersDispatch,
      asyncGetGroupMembers,
      REDUCER_ACTIONS,
      membersData,
    };
  }

  let membersData = {} as Group;

  membersData = state;

  return {
    membersDispatch,
    asyncGetGroupMembers,
    REDUCER_ACTIONS,
    membersData,
  };
};

export type UseGroupMembersContextType = ReturnType<typeof useGroupContext>;

const initialGroupContextState: UseGroupMembersContextType = {
  membersDispatch: () => {},
  asyncGetGroupMembers,
  REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
  membersData: {
    name: "",
    administrator: { id: 0, name: "", avatar: { id: "", path: "" } },
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
  },
};

const MembersContext = createContext<UseGroupMembersContextType>(
  initialGroupContextState
);

export const GroupMembersProvider = ({
  children,
}: ChildrenType): ReactElement => {
  return (
    <MembersContext.Provider value={useGroupContext(initialMembersState)}>
      {children}
    </MembersContext.Provider>
  );
};

export default MembersContext;
