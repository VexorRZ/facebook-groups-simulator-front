/* eslint-disable @typescript-eslint/naming-convention */
import { type TopicData, type ReducerAction } from "./interfaces";

import { REDUCER_ACTION_TYPE } from "./action-types";

export const reducer = (state: TopicData, action: ReducerAction): TopicData => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.CREATE_TOPIC: {
      if (action.payload == null) {
        throw new Error("action.payload missing in ADD action");
      }

      const { id, name } = action.payload;

      return {
        ...state,

        name,
        id,
      };
    }

    case REDUCER_ACTION_TYPE.LOAD_TOPICS: {
      if (action.payload == null) {
        throw new Error("action.payload missing in ADD action");
      }

      const { id, name } = action.payload;

      return {
        ...state,

        name,
        id,
      };
    }

    default:
      throw new Error("Unidentified reducer action type");
  }
};
