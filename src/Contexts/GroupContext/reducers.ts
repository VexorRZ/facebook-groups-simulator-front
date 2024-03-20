import { type Groups, type ReducerAction } from "./interfaces";

import { REDUCER_ACTION_TYPE } from "./action-types";
export const reducer = (state: Groups, action: ReducerAction): Groups => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.CREATE_GROUP: {
      if (action.payload == null) {
        throw new Error("action.payload missing in ADD action");
      }

      const { name, administrator, moderators, is_private, id, topics } =
        action.payload;

      return {
        ...state,
        name,
        administrator,
        moderators,
        is_private,
        id,
        topics,
      };
    }

    case REDUCER_ACTION_TYPE.LOAD_GROUS: {
      if (action.payload == null) {
        throw new Error("action.payload missing in ADD action");
      }

      const { name, administrator, moderators, is_private, id, topics } =
        action.payload;

      return {
        ...state,
        name,
        administrator,
        moderators,
        is_private,
        id,
        topics,
      };
    }

    case REDUCER_ACTION_TYPE.REQUEST_ENTER_GROUP: {
      if (action.payload == null) {
        throw new Error("action.payload missing in ADD action");
      }

      const { navigateAvailable } = action.payload;

      return {
        ...state,
        navigateAvailable,
      };
    }

    default:
      throw new Error("Unidentified reducer action type");
  }
};
