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
    localStorage.setItem("@id:user", response.data.user.id);
    localStorage.setItem("@token", response.data.token);
    localStorage.setItem("@avatarId:user", response.data.user.avatar.id);
    localStorage.setItem("@avatarPath:user", response.data.user.avatar.path);

    console.log("userData", response.data.user.avatar);

    ToastSuccess("Login realizado com sucesso");

    return dispatch({
      type: REDUCER_ACTION_TYPE.LOGIN,
      payload: {
        name: response.data.user.name,
        email: response.data.user.email,
        avatar: response.data.user.avatar,
      },
    });
  }
};

export const ContextSignUp = async (
  name: string,
  surname: string,
  email: string,
  password: string
) => {
  const response: AxiosResponse = await api.post<AxiosResponse>("users", {
    name,
    surname,
    email,
    password,
  });

  if (response.data.error) {
    ToastError("Erro ao criar conta, tente novamente");

    console.log(response.data.error);
    return;
  } else {
    ToastSuccess("Conta criada com sucesso.");
  }
};

export function AsyncLogoutFn(dispatch: any) {
  localStorage.clear();
  ToastMessage("Logout realizado com sucesso");
  return dispatch({
    type: REDUCER_ACTION_TYPE.LOGOUT,
    payload: { name: "", email: "", token: "" },
  });
}

// export function updateUserStorage(dispatch: any) {
//   const storagedUser = localStorage.getItem("@name:user");
//   const storagedToken = localStorage.getItem("@token");

//   if (Boolean(storagedToken) && Boolean(storagedUser)) {
//     return dispatch({
//       type: REDUCER_ACTION_TYPE.UPDATE,
//       payload: { token: storagedToken },
//     });
//   }
// }
