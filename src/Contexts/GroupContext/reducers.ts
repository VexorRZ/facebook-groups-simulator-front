import { type Groups, type ReducerAction } from "./interfaces";

import { REDUCER_ACTION_TYPE } from "./action-types";

export const reducer = (state: Groups, action: ReducerAction): Groups => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.CREATE_GROUP: {
      if (action.payload == null) {
        throw new Error("action.payload missing in ADD action");
      }

      const data = action.payload;
      return {
        ...state,
        ...data,
      };
    }

    case REDUCER_ACTION_TYPE.LOAD_GROUPS: {
      if (action.payload == null) {
        throw new Error("action.payload missing in ADD action");
      }

      const groups = action.payload;

      return groups;
    }

    case REDUCER_ACTION_TYPE.LOAD_MORE_GROUPS: {
      if (action.payload == null) {
        throw new Error("action.payload missing in ADD action");
      }

      const moreGroups = action.payload;

      return moreGroups;
    }

    case REDUCER_ACTION_TYPE.LOAD_MEMBERS: {
      if (action.payload == null) {
        throw new Error("action.payload missing in ADD action");
      }
      const members = action.payload;

      console.log("members", members);

      return {
        ...state,
        ...members,
      };
    }

    case REDUCER_ACTION_TYPE.LOAD_GROUPS_MEMBER: {
      if (action.payload == null) {
        throw new Error("action.payload missing in ADD action");
      }
      const groups = action.payload;

      return { ...groups };
    }

    case REDUCER_ACTION_TYPE.UPDATE_GROUP: {
      if (action.payload == null) {
        throw new Error("action.payload missing in ADD action");
      }
      const editedGroup = action.payload;

      return { ...state, ...editedGroup };
    }
    // case REDUCER_ACTION_TYPE.REQUEST_ENTER_GROUP: {
    //   if (action.payload == null) {
    //     throw new Error("action.payload missing in ADD action");
    //   }

    //   const { navigateAvailable } = action.payload;

    //   return {
    //     ...state,
    //     navigateAvailable,
    //   };
    // }

    default:
      throw new Error("Unidentified reducer action type");
  }
};
