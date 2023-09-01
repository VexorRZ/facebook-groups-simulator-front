/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import React, { useEffect, useState, useCallback } from "react";
import Topic from "../../Components/TopicContent";
import { useParams, useNavigate } from "react-router-dom";
import { type AxiosResponse } from "axios";
import api from "../../services/api";
import { type Groups } from "../../services/interfaces";
import { Container, GroupImage, GroupTitle, Header, TopicList } from "./styles";
import TopBar from "../../Components/TopBar";
import Pagination from "../../Components/Pagination";

const Group = () => {
  const LIMIT = 12;

  const params = useParams();
  const [group, setGroup] = useState<Partial<Groups>>({});
  const [offset, setOffset] = useState(0);

  const { group_id } = params;

  const navigate = useNavigate();

  const openTopic = useCallback((topicId: number) => {
    navigate(`/topics/${Number(group_id)}/${topicId}`);
  }, []);

  const getGroupsByUser = useCallback(async () => {
    const token = localStorage.getItem("@token");

    if (!token) {
      return;
    }

    try {
      const res: AxiosResponse<Groups> = await api.get<
        Groups,
        AxiosResponse<Groups>
      >(`groups/${Number(group_id)}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setGroup({ ...res.data });

      console.log(group);
    } catch (err) {
      return err;
    }
  }, []);

  useEffect(() => {
    void getGroupsByUser();
  }, [offset]);
  return (
    <>
      <TopBar />
      <Container>
        <Header>
          <GroupTitle>{group.name}</GroupTitle>
          <GroupImage />
        </Header>
        <TopicList>
          {group?.topics?.slice(0, 6).map((topic, index) => {
            return (
              <Topic
                URlGroup={true}
                topicName={topic.name}
                numberOfComments={topic.comments.length}
                key={index}
                onClick={() => {
                  openTopic(topic.id);
                }}
              />
            );
          })}
          {group.topics?.length && (
            <Pagination
              limit={LIMIT}
              total={group.topics?.length}
              offset={offset}
              setOffset={setOffset}
            />
          )}
        </TopicList>
      </Container>
    </>
  );
};

export default Group;
