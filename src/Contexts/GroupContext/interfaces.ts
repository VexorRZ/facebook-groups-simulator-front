import { type ReactElement } from "react";

export interface Groups {
  administrator: administrator;
  id: number;
  iSprivate: boolean;
  members: members[];
  moderators: moderators[];
  name: string;
  topics: topics[];
}

interface members {
  id: number;
  name: string;
}

interface moderators {
  id: number;
  name: string;
}

interface administrator {
  id: number;
  name: string;
}

interface topics {
  id: number;
  name: string;
}

export interface ReducerAction {
  type: string;
  payload?: Groups;
}

export interface ChildrenType {
  children?: ReactElement | ReactElement[];
}
