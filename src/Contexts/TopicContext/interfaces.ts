import { type ReactElement } from "react";
export interface GroupTopic {
  id: number;
  name: string;
  topics: Topics[];
}

interface Topics {
  id: number;
  name: string;
  author: Author;
  comments: Comments[];
}

interface Author {
  id: number;
  name: string;
}

export interface Comments {
  id: number;
  body: string;
  author: CommentAuthor;
}

interface CommentAuthor {
  id: number;
  name: string;
}

export interface ReducerAction {
  type: string;
  payload?: GroupTopic;
}

export interface ChildrenType {
  children?: ReactElement | ReactElement[];
}
