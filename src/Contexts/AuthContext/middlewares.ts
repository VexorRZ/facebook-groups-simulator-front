/* eslint-disable no-useless-return */
/* eslint-disable @typescript-eslint/space-before-function-paren */

import { type AxiosResponse } from "axios";
import api from "../../services/api";
import { REDUCER_ACTION_TYPE } from "./action-types";
import { type avatar } from "../../Contexts/AuthContext/interfaces";

import {
  ToastError,
  ToastSuccess,
  ToastMessage,
} from "../../Components/ToastContainer/ToastMessages";
import { toast } from "react-toastify";

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

    console.log("data", response.data);
    localStorage.setItem("@name:user", response.data.user.name);
    localStorage.setItem("@email:user", response.data.user.email);
    localStorage.setItem("@id:user", response.data.user.id);
    localStorage.setItem("@token", response.data.token);

    if (response.data.user.avatar) {
      localStorage.setItem("@avatarId:user", response.data.user.avatar.id);
      localStorage.setItem("@avatarPath:user", response.data.user.avatar.path);
    }
    ToastSuccess("Login realizado com sucesso");

    return dispatch({
      type: REDUCER_ACTION_TYPE.LOGIN,
      payload: {
        name: response.data.user.name,
        email: response.data.user.email,
        token: response.data.token,
        avatar: {
          id: response.data.user.avatar ? response.data.user.avatar.id : "",
          path: response.data.user.avatar ? response.data.user.avatar.path : "",
        },
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

export async function asyncChangeAvatar(dispatch: any, data: FormData) {
  try {
    const response: AxiosResponse<avatar> = await api.patch<
      avatar,
      AxiosResponse<avatar>
    >(`files`, data);

    localStorage.setItem("@avatarId:user", response.data.id);
    localStorage.setItem("@avatarPath:user", response.data.path);
    ToastSuccess("Avatar atualizado");

    return dispatch({
      type: REDUCER_ACTION_TYPE.CHANGEAVATAR,
      payload: {
        avatar: {
          id: response.data.id,
          path: response.data.path,
        },
      },
    });
  } catch (err) {
    console.log(err);
    ToastError("Erro ao atualizar avatar");
  }
}

export async function forgotPassword(token: string) {
  try {
    const response: AxiosResponse = await api.get<AxiosResponse>(
      `reset_password/${token}`
    );

    return response;
  } catch (err) {
    return err;
  }
}

export async function recoverPassword(email: string) {
  try {
    const response: AxiosResponse = await api.post<AxiosResponse>(
      `forgot_password`,
      {
        email,
      }
    );
    ToastSuccess("requisição enviada com sucesso, cheque seu e-mail.");
    return response;
  } catch (err) {
    ToastError("Erro ao fazer a requisição");
  }
}

export async function resetPassword(newPassword: string, token: string) {
  try {
    console.log(newPassword);
    const response: AxiosResponse = await api.post<AxiosResponse>(
      `reset_password_confirm`,
      {
        newPassword,
        token,
      }
    );
    if (response.data.error) {
      ToastError("Erro ao tentar atualizar a senha, tente novamente");

      console.log(response.data.error);
      return;
    }

    return ToastSuccess("Senha atualizada com sucesso");
  } catch (err) {
    ToastError(`${err}`);
  }
}

export const asyncRequestDeleteAccount = async (
  user_id: number,
  token: string
) => {
  if (!token) {
    ToastError("Ação não permitida");
    return;
  }

  try {
    const res: AxiosResponse<Response> = await api.delete<
      Response,
      AxiosResponse<Response>
    >(`users/${String(user_id)}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    ToastMessage("Perfil deletado com sucesso, deslogando da aplicação");
    localStorage.clear();
    return res.status;
  } catch (err) {
    ToastError("Ocorreu um erro ao tentar deletar seu perfil");
    return err;
  }
};

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
