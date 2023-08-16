/* eslint-disable @typescript-eslint/consistent-type-assertions */
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { type AxiosResponse } from "axios";
import api from "../../services/api";
import { type Topics } from "../../Contexts/TopicContext/interfaces";
import {
  Container,
  GroupImage,
  GroupTitle,
  Header,
  CommentList,
  Comment,
} from "./styles";
import TopBar from "../../Components/TopBar";

const TopicPage = () => {
  const params = useParams();
  const [topic, setTopic] = useState<Partial<Topics>>({});

  const { groupId, topicId } = params;

  const getTopicByCredentials = useCallback(async () => {
    const token = localStorage.getItem("@token");

    if (!token) {
      return;
    }

    try {
      const res: AxiosResponse<Topics> = await api.get<
        Topics,
        AxiosResponse<Topics>
      >(`/topics/${Number(groupId)}/${Number(topicId)}}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTopic({ ...res.data });
    } catch (err) {
      return err;
    }
  }, []);

  useEffect(() => {
    void getTopicByCredentials();
  }, []);
  return (
    <>
      <TopBar />
      <Container>
        <Header>
          <GroupTitle>{topic.title}</GroupTitle>
          <GroupImage />
        </Header>
        <CommentList>
          {topic?.comments?.slice(0, 10).map((comment, index) => {
            return (
              <Comment key={index}>
                <div className="author">{comment.author_id}</div>
                <div className="body">{comment.body}</div>
              </Comment>
            );
          })}
        </CommentList>
      </Container>
    </>
  );
};

export default TopicPage;
