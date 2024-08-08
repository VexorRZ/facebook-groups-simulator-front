/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/space-before-function-paren */

import { type AxiosResponse } from "axios";
import api from "../../services/api";
import { REDUCER_ACTION_TYPE } from "./action-types";
import { type Groups } from "./interfaces";

import {
  ToastError,
  ToastSuccess,
} from "../../Components/ToastContainer/ToastMessages";

export const asyncCreateGroup = async (data: FormData) => {
  const token = localStorage.getItem("@token");
  const response: AxiosResponse = await api.post<AxiosResponse>(
    `groups`,
    data,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (response.data.error) {
    ToastError("Erro ao tentar criar o grupo");
  } else {
    ToastSuccess("Grupo criado com sucesso");

    return response.data;
  }
};

export const asyncCreateRequest = async (group_id: number, dispatch: any) => {
  try {
    const response: AxiosResponse = await api.post<AxiosResponse>(
      `request_entry/${group_id}`
    );

    return response;
  } catch (err) {
    return err;
  }
};

export const asyncGetGroups = async (token: string, dispatch: any) => {
  const response: AxiosResponse<Groups> = await api.get<
    Groups,
    AxiosResponse<Groups>
  >(`groups?page=1&size=5`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  window.localStorage.setItem("@groups", JSON.stringify(response.data));

  return dispatch({
    type: REDUCER_ACTION_TYPE.LOAD_GROUPS,
    payload: response.data,
  });
};

export const asyncGetMoreGroups = async (
  token: string,
  index: string,
  dispatch: any
) => {
  const response: AxiosResponse<Groups> = await api.get<
    Groups,
    AxiosResponse<Groups>
  >(`groups/?page=${String(index)}&size=5`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  window.localStorage.removeItem("@MoreGroups");
  window.localStorage.setItem("@MoreGroups", JSON.stringify(response.data));

  return dispatch({
    type: REDUCER_ACTION_TYPE.LOAD_MORE_GROUPS,
    payload: response.data,
  });
};

export const asyncGetGroupMembers = async (
  group_id: number,

  dispatch: any
) => {
  try {
    const response: AxiosResponse = await api.get<AxiosResponse>(
      `groupsmembers/${String(34)}?page=1&size=3`
    );

    return dispatch({
      type: REDUCER_ACTION_TYPE.LOAD_MEMBERS,
      payload: response.data,
    });
  } catch (err) {
    return err;
  }
};

export const asyncGetGroupsByMember = async (dispatch: any) => {
  try {
    const response: AxiosResponse = await api.get<AxiosResponse>(
      `groupsmembers`
    );

    return dispatch({
      type: REDUCER_ACTION_TYPE.LOAD_GROUPS_MEMBER,
      payload: response.data,
    });
  } catch (err) {
    return err;
  }
};

export const asyncEditGroup = async (
  group_id: string,
  data: FormData,
  dispatch: any
) => {
  try {
    const response: AxiosResponse = await api.put<AxiosResponse>(
      `groups/${group_id}`,
      data
    );

    window.localStorage.setItem("@group", JSON.stringify(response.data));
    const group = window.localStorage.getItem("@group");

    if (group) {
      const groupData = JSON.parse(group);

      groupData.avatar.path = response.data.avatar.path;

      window.localStorage.setItem("@group", JSON.stringify(groupData));
    }

    if (response.data.error) {
      ToastError("Ocourre um erro ao atualizar o grupo");
    } else {
      ToastSuccess("Grupo atualizado com sucesso");
    }
    return dispatch({
      type: REDUCER_ACTION_TYPE.UPDATE_GROUP,
      payload: response.data,
    });
  } catch (err) {
    return err;
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
