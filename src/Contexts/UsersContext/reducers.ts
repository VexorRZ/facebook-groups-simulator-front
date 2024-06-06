import { type Users, type ReducerAction } from "./interfaces";

import { REDUCER_ACTION_TYPE } from "./action-types";
export const reducer = (state: Users, action: ReducerAction): Users => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.LOAD_USERS: {
      console.log("chegou aqui no reducer");
      if (action.payload == null) {
        throw new Error("action.payload missing in ADD action");
      }
      const users = action.payload;

      console.log("users no reducer", action.payload);
      return {
        ...state,
        ...users,
      };
    }

    default:
      throw new Error("Unidentified reducer action type");
  }
};
