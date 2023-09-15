/* eslint-disable multiline-ternary */
import React, { useEffect, useState, useCallback } from "react";

import TopBar from "../../Components/TopBar";
import SideMenu from "../../Components/SideMenu";
import GroupCard from "../../Components/GroupCard";
import TopicContent from "../../Components/TopicContent";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

import { type Groups } from "../../services/interfaces";

import { Content, Container, GroupCardList } from "./styles";

import { type AxiosResponse } from "axios";

const Dashboard = () => {
  const [userName, setUserName] = useState<string>("");
  const [groups, setGroups] = useState<Groups[]>([]);

  const navigate = useNavigate();

  const openGroup = useCallback((id: number) => {
    navigate(`/group/${id}`);
  }, []);

  const openTopic = useCallback((groupId: number, topicId: number) => {
    navigate(`/topics/${groupId}/${topicId}`);
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
      >(`groups`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("data:", res.data);
      // @ts-expect-error
      setGroups([...res.data]);
      console.log(groups);
    } catch (err) {
      return err;
    }
  }, []);

  useEffect(() => {
    void getGroupsByUser();

    const userNameStorage = localStorage.getItem("@name:user");
    if (userNameStorage !== null) {
      setUserName(userNameStorage);
    } else {
      setUserName("Erro ao carregar nome");
    }
  }, []);

  return (
    <Container>
      <TopBar />
      <Content>
        <SideMenu />

        <GroupCardList>
          <h1>OLÁ {userName} </h1>

          {groups?.map((group, index) => {
            return (
              <>
                <GroupCard
                  key={index}
                  groupName={group.name}
                  numberOfMbembers={1}
                  numberOfTopics={1}
                  onClick={() => {
                    openGroup(group.id);
                  }}
                >
                  {group.topics?.slice(0, 3).map((topic, index) => {
                    return (
                      <>
                        <TopicContent
                          key={index}
                          topicName={topic.name}
                          numberOfComments={topic.comments.length}
                          onClick={() => {
                            openTopic(group.id, topic.id);
                          }}
                        />
                      </>
                    );
                  })}
                </GroupCard>
              </>
            );
          })}
        </GroupCardList>
      </Content>
    </Container>
  );
};

export default Dashboard;
