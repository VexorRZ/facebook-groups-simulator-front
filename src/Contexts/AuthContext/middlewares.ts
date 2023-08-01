/* eslint-disable @typescript-eslint/space-before-function-paren */
import api from "../../services/api";
import { REDUCER_ACTION_TYPE } from "./action-types";
import { type DispatchType } from "./Interfaces";

export const asyncLoginFn = async (
  userData: object,
  { dispatch }: DispatchType
) => {
  try {
    const response = await api.post("/login", {
      userData,
    });
    api.defaults.headers.Authorization = `Bearer ${String(
      response.data.token
    )}`;

    sessionStorage.setItem("@App:user", JSON.stringify(response.data.user));
    sessionStorage.setItem("@App:token", response.data.token);
    return dispatch({
      type: REDUCER_ACTION_TYPE.LOGIN,
      payload: response.data,
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
