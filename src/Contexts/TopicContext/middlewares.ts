/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/space-before-function-paren */
import { type AxiosResponse } from "axios";
import api from "../../services/api";

import {
  ToastError,
  ToastMessage,
} from "../../Components/ToastContainer/ToastMessages";

export const asyncDeleteComment = async (
  group_id: number,
  topic_id: number,
  comment_id: number,
  token: string
) => {
  if (!token) {
    ToastError("Ação não permitida");
    return;
  }

  try {
    const response: AxiosResponse<Response> = await api.delete<
      Response,
      AxiosResponse<Response>
    >(`comments/${group_id}/${topic_id}/${comment_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    ToastMessage("Comentário removido!");

    return response.status;
  } catch (err) {
    ToastError("Ocorreu um erro ao tentar remover o comentário");
    return err;
  }
};
