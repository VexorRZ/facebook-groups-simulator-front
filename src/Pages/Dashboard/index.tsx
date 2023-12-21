/* eslint-disable multiline-ternary */
import React, { useEffect, useState, useCallback } from "react";

import TopBar from "../../Components/TopBar";
import SideMenu from "../../Components/SideMenu";
import GroupCard from "../../Containers/GroupCard";
import TopicContent from "../../Components/TopicContent";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import useAuth from "../../Hooks/useAuth";

// import { type Groups } from "../../services/interfaces";
import { type Groups } from "../../Contexts/GroupContext/interfaces";

import { Content, Container, GroupCardList, NoTopicsCard } from "./styles";

import { type AxiosResponse } from "axios";

const Dashboard = () => {
  const [groups, setGroups] = useState<Groups[]>([]);

  const { name } = useAuth();
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

  // const getGroupAvatar = async () => {

  // };

  useEffect(() => {
    void getGroupsByUser();
  }, []);

  return (
    <Container>
      <TopBar />
      <Content>
        <SideMenu />

        <GroupCardList>
          <h1>Olá {name} </h1>

          {groups?.map((group, index) => {
            return (
              <>
                <GroupCard
                  onClickView={() => {
                    openGroup(group.id);
                  }}
                  onClickEnter={() => {}}
                  key={index}
                  groupOwner={group.administrator.name}
                  groupName={group.name}
                  groupStatus={
                    group.iSprivate ? `${`Privado`}` : `${`Público`}`
                  }
                  numberOfMbembers={1}
                  statusColor={group.iSprivate ? `${`red`}` : `${`green`}`}
                  numberOfTopics={group.topics.length}
                  groupImage={group.avatar.path}
                  isPrivate={group.iSprivate}
                  CardButtonTextEnter="Entrar"
                  CardButtonTextView="Ver Grupo"
                >
                  {group.topics.length !== 0 ? (
                    group.topics?.slice(0, 3).map((topic, index) => {
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
                    })
                  ) : (
                    <NoTopicsCard>
                      Esse grupo ainda não possui nenhum tópico
                    </NoTopicsCard>
                  )}
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
