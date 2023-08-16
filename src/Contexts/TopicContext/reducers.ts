import { type Topics, type ReducerAction } from "./interfaces";

import { REDUCER_ACTION_TYPE } from "./action-types";
export const reducer = (state: Topics, action: ReducerAction): Topics => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.CREATE_TOPIC: {
      if (action.payload == null) {
        throw new Error("action.payload missing in ADD action");
      }

      const { iSclosed, topicCreator, id, comments } = action.payload;

      return {
        ...state,
        iSclosed,
        topicCreator,
        comments,
        id,
      };
    }

    case REDUCER_ACTION_TYPE.LOAD_TOPICS: {
      if (action.payload == null) {
        throw new Error("action.payload missing in ADD action");
      }

      const { iSclosed, topicCreator, id, comments } = action.payload;

      return {
        ...state,
        iSclosed,
        topicCreator,
        comments,
        id,
      };
    }

    default:
      throw new Error("Unidentified reducer action type");
  }
};
