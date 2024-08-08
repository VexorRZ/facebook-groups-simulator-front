import React, {
  useMemo,
  useReducer,
  createContext,
  type ReactElement,
} from "react";

import { REDUCER_ACTION_TYPE } from "./action-types";

import { asyncDeleteComment } from "./middlewares";

import { type TopicData, type ChildrenType } from "./interfaces";
import { reducer } from "./reducers";

const initialTopicState: TopicData = {
  id: 0,
  name: "",
  topics: [],
  members: [],
};

export type ReducerActionType = typeof REDUCER_ACTION_TYPE;

const useTopicContext = (initialTopicState: TopicData) => {
  const [state, dispatch] = useReducer(reducer, initialTopicState);

  const REDUCER_ACTIONS = useMemo(() => {
    return REDUCER_ACTION_TYPE;
  }, []);

  const id = state.id;
  const name = state.name;
  const topics = state.topics;

  return {
    dispatch,
    asyncDeleteComment,
    REDUCER_ACTIONS,
    id,
    name,
    topics,
  };
};

export type UseTopicContextType = ReturnType<typeof useTopicContext>;

const initialGroupContextState: UseTopicContextType = {
  dispatch: () => {},
  asyncDeleteComment,
  REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
  id: 0,
  name: "",
  topics: [],
};

const TopicContext = createContext<UseTopicContextType>(
  initialGroupContextState
);

export const TopicProvider = ({ children }: ChildrenType): ReactElement => {
  return (
    <TopicContext.Provider value={useTopicContext(initialTopicState)}>
      {children}
    </TopicContext.Provider>
  );
};

export default TopicContext;
