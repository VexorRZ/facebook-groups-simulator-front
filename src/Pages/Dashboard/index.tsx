/* eslint-disable multiline-ternary */
import React, { useEffect, useState, useCallback } from "react";

import TopBar from "../../Components/TopBar";
import SideMenu from "../../Components/SideMenu";
import GroupCard from "../../Containers/GroupCard";
import TopicContent from "../../Components/TopicContent";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import useAuth from "../../Hooks/useAuth";

import { type Groups } from "../../services/interfaces";

import { Content, Container, GroupCardList, NoTopicsCard } from "./styles";

import { type AxiosResponse } from "axios";

const Dashboard = () => {
  const [groups, setGroups] = useState<Groups[]>([]);
  const [DialogIsVisible, SetDialogIsVisible] = useState<boolean>(false);

  const toggleDialogBOx = useCallback((value: boolean) => {
    SetDialogIsVisible(value);
  }, []);

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
                  onCancel={() => {
                    toggleDialogBOx(false);
                  }}
                  onConfirm={() => {
                    openGroup(group.id);
                  }}
                  dialogIsVisible={DialogIsVisible}
                  key={index}
                  groupOwner={group.administrator.name}
                  groupName={group.name}
                  groupStatus={
                    group.is_private ? `${`Privado`}` : `${`Público`}`
                  }
                  numberOfMbembers={1}
                  statusColor={group.is_private ? `${`red`}` : `${`green`}`}
                  numberOfTopics={group.topics.length}
                  groupImage={group.avatar}
                  isPrivate={group.is_private}
                  joiningButtonText="Entrar"
                  onClick={() => {
                    toggleDialogBOx(true);
                  }}
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
