/* eslint-disable no-useless-return */
/* eslint-disable @typescript-eslint/space-before-function-paren */

import { type AxiosResponse } from "axios";
import api from "../../services/api";
import { REDUCER_ACTION_TYPE } from "./action-types";
import {
  ToastError,
  ToastSuccess,
  ToastMessage,
} from "../../Components/ToastContainer/ToastMessages";

export const asyncLoginFn = async (
  email: string,
  password: string,
  dispatch: any
) => {
  const response: AxiosResponse = await api.post<AxiosResponse>("sessions", {
    email,
    password,
  });

  if (response.data.error) {
    ToastError("Erro ao tentar executar o login");

    console.log(response.data.error);
    return;
  } else {
    api.defaults.headers.Authorization = `Bearer ${String(
      response.data.token
    )}`;

    localStorage.setItem("@name:user", response.data.user.name);
    localStorage.setItem("@signed", JSON.stringify(true));
    localStorage.setItem("@token", response.data.token);

    console.log(response.data);

    ToastSuccess("Login realizado com sucesso");

    return dispatch({
      type: REDUCER_ACTION_TYPE.LOGIN,
      payload: { token: response.data.token, name: response.data.user.name },
    });
  }
};

export function AsyncLogoutFn(dispatch: any) {
  localStorage.clear();
  ToastMessage("Logout realizado com sucesso");
  return dispatch({
    type: REDUCER_ACTION_TYPE.LOGOUT,
    payload: { signed: false, name: "" },
  });
}

export function updateUserStorage(dispatch: any) {
  const storagedUser = localStorage.getItem("@name:user");
  const storagedToken = localStorage.getItem("@token");

  if (Boolean(storagedToken) && Boolean(storagedUser)) {
    return dispatch({
      type: REDUCER_ACTION_TYPE.UPDATE,
      payload: { token: storagedToken },
    });
  }
}
