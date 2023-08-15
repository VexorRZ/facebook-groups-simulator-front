/* eslint-disable @typescript-eslint/consistent-type-assertions */
import React, { useEffect, useState, useCallback } from "react";
import Topic from "../../Components/TopicContent";
import { useParams } from "react-router-dom";
import { type AxiosResponse } from "axios";
import api from "../../services/api";
import { type Groups } from "../../services/interfaces";
import { Container, GroupImage, GroupTitle, Header, TopicList } from "./styles";
import TopBar from "../../Components/TopBar";

const Group = () => {
  const params = useParams();
  const [group, setGroup] = useState<Partial<Groups>>({});

  const { id } = params;

  const getGroupsByUser = useCallback(async () => {
    const token = localStorage.getItem("@token");

    if (!token) {
      return;
    }

    try {
      const res: AxiosResponse<Groups> = await api.get<
        Groups,
        AxiosResponse<Groups>
      >(`groups/${String(id)}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setGroup({ ...res.data });
    } catch (err) {
      return err;
    }
  }, []);

  useEffect(() => {
    void getGroupsByUser();
  }, []);
  return (
    <>
      <TopBar />
      <Container>
        <Header>
          <GroupTitle>{group.name}</GroupTitle>
          <GroupImage />
        </Header>
        <TopicList>
          {group?.topics?.slice(0, 10).map((topic, index) => {
            return (
              <Topic
                URlGroup={true}
                topicName={topic.name}
                numberOfComments={1}
                key={index}
              />
            );
          })}
        </TopicList>
      </Container>
    </>
  );
};

export default Group;
