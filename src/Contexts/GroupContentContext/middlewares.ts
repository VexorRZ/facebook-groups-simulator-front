/* eslint-disable @typescript-eslint/space-before-function-paren */

import { useCallback } from "react";
import { type AxiosResponse } from "axios";
import api from "../../services/api";
import { REDUCER_ACTION_TYPE } from "./action-types";
import { Group } from "./interfaces";

export const asyncGetGroupMembers = async (group_id: string, dispatch: any) => {
  try {
    const response: AxiosResponse = await api.get<AxiosResponse>(
      `groupsmembers/${group_id}?page=1&size=5`
    );

    return dispatch({
      type: REDUCER_ACTION_TYPE.LOAD_MEMBERS,
      payload: response.data,
    });
  } catch (err) {
    return err;
  }
};
