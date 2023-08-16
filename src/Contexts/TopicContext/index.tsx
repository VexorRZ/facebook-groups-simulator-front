import React, {
  useMemo,
  useReducer,
  createContext,
  type ReactElement,
} from "react";

import { REDUCER_ACTION_TYPE } from "./action-types";

import { type Topics, type ChildrenType } from "./interfaces";
import { reducer } from "./reducers";

const initialTopicState: Topics = {
  topicCreator: { id: 0, name: "" },
  id: 0,
  iSclosed: false,
  comments: [],
  title: "",
};

export type ReducerActionType = typeof REDUCER_ACTION_TYPE;

const useTopicContext = (initialTopicState: Topics) => {
  const [state, dispatch] = useReducer(reducer, initialTopicState);

  const REDUCER_ACTIONS = useMemo(() => {
    return REDUCER_ACTION_TYPE;
  }, []);

  const topicCreator = state.topicCreator;
  const id = state.id;
  const iSclosed = state.iSclosed;
  const comments = state.comments;
  const title = state.title;

  return {
    dispatch,
    REDUCER_ACTIONS,
    topicCreator,
    id,
    iSclosed,
    comments,
    title,
  };
};

export type UseTopicContextType = ReturnType<typeof useTopicContext>;

const initialGroupContextState: UseTopicContextType = {
  dispatch: () => {},
  REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
  topicCreator: { id: 0, name: "" },
  id: 0,
  iSclosed: false,
  comments: [],
  title: "",
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
