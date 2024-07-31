import { type UserType, type ReducerAction } from "./interfaces";

import { REDUCER_ACTION_TYPE } from "./action-types";
export const reducer = (state: UserType, action: ReducerAction): UserType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.LOGIN: {
      if (action.payload == null) {
        throw new Error("action.payload missing in ADD action");
      }

      const data = action.payload;

      return {
        ...state,
        ...data,
      };
    }

    case REDUCER_ACTION_TYPE.LOGOUT: {
      if (action.payload == null) {
        throw new Error("action.payload missing in ADD action");
      }

      const { email, name, token } = action.payload;

      return { ...state, email, name, token };
    }

    case REDUCER_ACTION_TYPE.UPDATE: {
      if (action.payload == null) {
        throw new Error("action.payload missing in ADD action");
      }

      const { token } = action.payload;

      return { ...state, token };
    }

    case REDUCER_ACTION_TYPE.CHANGEAVATAR: {
      if (action.payload == null) {
        throw new Error("action.payload missing in ADD action");
      }

      const { avatar } = action.payload;

      return { ...state, ...avatar };
    }

    case REDUCER_ACTION_TYPE.LOAD_USERS: {
      if (action.payload == null) {
        throw new Error("action.payload missing in ADD action");
      }
      const users = action.payload;
      return {
        ...state,
        ...users,
      };
    }

    default:
      throw new Error("Unidentified reducer action type");
  }
};
