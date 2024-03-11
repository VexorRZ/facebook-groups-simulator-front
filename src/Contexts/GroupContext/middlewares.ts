/* eslint-disable @typescript-eslint/space-before-function-paren */

import { type AxiosResponse } from "axios";
import api from "../../services/api";
// import { REDUCER_ACTION_TYPE } from "./action-types";

import {
  ToastError,
  ToastSuccess,
} from "../../Components/ToastContainer/ToastMessages";

export const asyncCreateGroup = async (data: FormData) => {
  const response: AxiosResponse = await api.post<AxiosResponse>(`groups`, data);

  if (response.data.error) {
    ToastError("Erro ao tentar criar o grupo");
  } else {
    ToastSuccess("Grupo criado com sucesso");

    return response.data;
  }
};

export const asyncCreateRequest = async (group_id: number) => {
  try {
    const response: AxiosResponse = await api.post<AxiosResponse>(
      `request_entry/${group_id}`
    );

    if (response.data.error) {
      ToastError("Erro ao tentar criar o grupo");
    } else {
      ToastSuccess("Acesso realizado com sucesso");

      return response.data;
    }
  } catch (err) {
    console.log(err);
  }
};

// export async function asyncAddAvatar(dispatch: any, data: FormData) {
//   try {
//     const response: AxiosResponse<avatar> = await api.patch<
//       avatar,
//       AxiosResponse<avatar>
//     >(`files`, data);

//     localStorage.setItem("@avatarId:user", response.data.id);
//     localStorage.setItem("@avatarPath:user", response.data.path);
//     ToastSuccess("Deu certo");

//     return dispatch({
//       type: REDUCER_ACTION_TYPE.CHANGEAVATAR,
//       payload: {
//         avatar: {
//           id: response.data.id,
//           path: response.data.path,
//         },
//       },
//     });
//   } catch (err) {
//     ToastError("Erro ao atualizar avatar");
//   }
// }
