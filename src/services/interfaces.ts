export interface Response {
  numberOfTopics?: number;
  group?: Groups;
  isOwner?: object;
}

export interface Groups {
  administrator: administrator;
  id: number;
  is_private: boolean;
  moderators: moderators[];
  name: string;
  topics: topics[];
  isMember?: boolean;
  avatar: string;
  members: members[];
}

interface members {
  id: string;
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
  id?: number;
  createdAt?: Date | number;
}

interface author {
  id: number;
  name: string;
  user_avatar_id?: string;
  avatar?: avatar;
}
interface avatar {
  path: string | null;
}
