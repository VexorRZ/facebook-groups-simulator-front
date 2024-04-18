import { type ReactElement } from "react";

export interface Members {
  id: number;
  name: string;
  avatar: Avatar;
}

interface Avatar {
  id: string;
  path: string;
}

export interface ReducerAction {
  type: string;
  payload?: Members;
}

export interface ChildrenType {
  children?: ReactElement | ReactElement[];
}
