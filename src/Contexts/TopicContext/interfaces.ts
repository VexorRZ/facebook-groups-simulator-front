import { type ReactElement } from "react";

export interface Topics {
  topicCreator: TopicCreator;
  id: number;
  iSclosed: boolean;
  comments: comments[];
  title: string;
}

interface comments {
  id: number;
  author_id: number;
  body: string;
}

interface TopicCreator {
  id: number;
  name: string;
}

export interface ReducerAction {
  type: string;
  payload?: Topics;
}

export interface ChildrenType {
  children?: ReactElement | ReactElement[];
}
