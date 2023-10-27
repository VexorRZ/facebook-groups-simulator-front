import { type ReactElement } from "react";

export interface UserType {
  password?: string;
  email?: string;
  token?: string;
  name?: string;
}

export interface ReducerAction {
  type: string;
  payload?: UserType;
}

export interface ChildrenType {
  children?: ReactElement | ReactElement[];
}
export interface DispatchType {
  dispatch: React.Dispatch<any> | any;
}
