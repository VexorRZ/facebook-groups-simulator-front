import { type UserType, type ReducerAction } from "./interfaces";

import { REDUCER_ACTION_TYPE } from "./action-types";
export const reducer = (state: UserType, action: ReducerAction): UserType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.LOGIN: {
      if (action.payload == null) {
        throw new Error("action.payload missing in ADD action");
      }

      const { email, password, token, name, signed } = action.payload;

      return { ...state, email, password, token, name, signed };
    }

    default:
      throw new Error("Unidentified reducer action type");
  }
};
