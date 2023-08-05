/* eslint-disable @typescript-eslint/space-before-function-paren */
import api from "../../services/api";
import { REDUCER_ACTION_TYPE } from "./action-types";

export const asyncLoginFn = async (
  email: string,
  password: string,
  dispatch: any
) => {
  try {
    const response = await api.post("sessions", {
      email,
      password,
    });

    api.defaults.headers.Authorization = `Bearer ${String(
      response.data.token
    )}`;

    return dispatch({
      type: REDUCER_ACTION_TYPE.LOGIN,
      payload: { signed: true, name: response.data.user.name },
    });
  } catch (err) {
    return err;
  }
};

export function Logout() {
  sessionStorage.removeItem("@App:user");
  sessionStorage.removeItem("App:token");

  return null;
}

export function updateUserStorage() {
  const storagedUser = localStorage.getItem("@App:user");
  const storagedToken = localStorage.getItem("@App:token");

  if (Boolean(storagedToken) && Boolean(storagedUser)) {
    api.defaults.headers.Authorization = `Bearer ${String(storagedToken)}`;
    return JSON.parse(String(storagedUser));
  }
}
