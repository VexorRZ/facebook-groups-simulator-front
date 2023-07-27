import * as actionTypes from "./action-types";

interface IBuildActions {
  dispatch: React.Dispatch<any> | any;
}

export const buildActions = ({ dispatch }: IBuildActions) => {
  return {
    increase: () => {
      dispatch({ type: actionTypes.INCREASE });
    },
    decrease: () => {
      dispatch({ type: actionTypes.DECREASE });
    },
    reset: () => {
      dispatch({ type: actionTypes.RESET });
    },
    setCounter: (payload: any) => {
      dispatch({ type: actionTypes.SET_COUNTER, payload });
    },
    asyncIncrease: async () => await asyncIncreaseFn(dispatch),
    asyncError: async () => await asyncErrorFn(dispatch),
  };
};

const asyncIncreaseFn = async ({ dispatch }: IBuildActions) => {
  dispatch({ type: actionTypes.ASYNC_INCREASE_START });

  return await new Promise((resolve) => {
    setTimeout(() => {
      dispatch({ type: actionTypes.ASYNC_INCREASE_END });
      resolve("RESOLVED!");
    }, 2000);
  });
};

const asyncErrorFn = async ({ dispatch }: IBuildActions) => {
  dispatch({ type: actionTypes.ASYNC_INCREASE_START });

  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      dispatch({ type: actionTypes.ASYNC_INCREASE_ERROR });
      reject(new Error("Deu ruim!"));
    }, 2000);
  });
};
