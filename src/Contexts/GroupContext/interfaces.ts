import { type ReactElement } from "react";

export interface Groups {
  administrator: administrator;
  id: number;
  iSprivate: boolean;
  members: members[];
  moderators: moderators[];
  name: string;
  topics: topics[];
  avatar: avatar;
}

interface avatar {
  id: string;
  path: string;
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

export interface topics {
  id: number;
  name: string;
  is_closed?: boolean;
  comments: comments[];
}
export interface comments {
  author: author;
  body: string;
  id: number;
  createdAt?: Date;
}

interface author {
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
