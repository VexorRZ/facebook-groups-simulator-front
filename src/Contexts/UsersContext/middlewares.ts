/* eslint-disable no-useless-return */
/* eslint-disable @typescript-eslint/space-before-function-paren */

import { type AxiosResponse } from "axios";
import api from "../../services/api";
import { REDUCER_ACTION_TYPE } from "./action-types";

import { ToastError } from "../../Components/ToastContainer/ToastMessages";

export const asyncLoadUsers = async (
  dispatch: any,
  token: string,
  name: string
) => {
  try {
    const res: AxiosResponse<Response> = await api.get<
      Response,
      AxiosResponse<Response>
    >(`users/${name}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    window.localStorage.setItem("@users", JSON.stringify(res.data));

    return dispatch({
      type: REDUCER_ACTION_TYPE.LOAD_USERS,
      payload: res.data,
    });
  } catch (err) {
    ToastError("Ocorreu um erro ao tentar deletar seu perfil");
    return err;
  }
};
