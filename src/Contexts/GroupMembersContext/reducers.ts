import { type Members, type ReducerAction } from "./interfaces";

import { REDUCER_ACTION_TYPE } from "./action-types";
export const reducers = (state: Members, action: ReducerAction): Members => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.LOAD_MEMBERS: {
      if (action.payload == null) {
        throw new Error("action.payload missing in ADD action");
      }

      const members = action.payload;
      console.log("chegou no reducer", members);
      return {
        ...members,
      };
    }

    default:
      throw new Error("Unidentified reducer action type");
  }
};
