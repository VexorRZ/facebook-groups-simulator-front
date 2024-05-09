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
  asyncGetGroups,
  asyncGetGroupMembers,
  asyncGetMoreGroups,
} from "./middlewares";

import { type Groups, type ChildrenType, members } from "./interfaces";
import { reducer } from "./reducers";

const initialGroupsState: Groups = {
  length: 0,
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

const useGroupContext = (initialGroupsState: Groups) => {
  const [state, dispatch] = useReducer(reducer, initialGroupsState);

  const REDUCER_ACTIONS = useMemo(() => {
    return REDUCER_ACTION_TYPE;
  }, []);

  const group = window.localStorage.getItem("@groups");

  if (group) {
    let groupData = JSON.parse(group) as Groups;

    return {
      dispatch,
      asyncCreateGroup,
      asyncCreateRequest,
      asyncGetGroups,
      asyncGetGroupMembers,
      asyncGetMoreGroups,
      REDUCER_ACTIONS,
      groupData,
    };
  }

  let groupData = {} as Groups;

  groupData = state;

  // console.log("dados do gropo no index", groupData);
  // const arraydata = [];
  // arraydata.push(groupData);
  // console.log("response in index", arraydata);
  return {
    dispatch,
    asyncCreateGroup,
    asyncCreateRequest,
    asyncGetGroups,
    asyncGetGroupMembers,
    asyncGetMoreGroups,
    REDUCER_ACTIONS,
    groupData,
  };
};

export type UseGroupContextType = ReturnType<typeof useGroupContext>;

const initialGroupContextState: UseGroupContextType = {
  dispatch: () => {},
  asyncCreateGroup,
  asyncCreateRequest,
  asyncGetGroups,
  asyncGetGroupMembers,
  asyncGetMoreGroups,
  REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
  groupData: {
    length: 0,
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
  },
};

const GroupContext = createContext<UseGroupContextType>(
  initialGroupContextState
);

export const GroupProvider = ({ children }: ChildrenType): ReactElement => {
  return (
    <GroupContext.Provider value={useGroupContext(initialGroupsState)}>
      {children}
    </GroupContext.Provider>
  );
};

export default GroupContext;
