import { type ReactElement } from "react";

export interface UserType {
  password: string;
  email: string;
  token: string;
  name: string;
  avatar: avatar;
  id: string;
}

export interface avatar {
  id: string;
  path: string;
}
export interface ReducerAction {
  type: string;
  payload?: UserType;
}

export interface ChildrenType {
  children?: ReactElement | ReactElement[];
  dispatch?: () => void;
}
export interface DispatchType {
  dispatch: React.Dispatch<any> | any;
}
