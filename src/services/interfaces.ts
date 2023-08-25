export interface Groups {
  administrator: administrator;
  id: number;
  is_private: boolean;
  moderators: moderators[];
  name: string;
  topics: topics[];
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
  comments: comments[];
}

interface comments {
  id: number;
  body: string;
  author: author;
}

interface author {
  id: number;
  name: string;
}
