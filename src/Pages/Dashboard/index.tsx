/* eslint-disable multiline-ternary */
import React, { useEffect, useState, useCallback } from "react";

import { type AxiosResponse } from "axios";
import TopBar from "../../Components/TopBar";
import SideMenu from "../../Components/SideMenu";
import GroupCard from "../../Containers/GroupCard";
import TopicContent from "../../Components/TopicContent";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import useAuth from "../../Hooks/useAuth";
import useGroups from "../../Hooks/useGroups";
import {
  ToastError,
  ToastSuccess,
  ToastMessage,
} from "../../Components/ToastContainer/ToastMessages";

import { type Groups } from "../../Contexts/GroupContext/interfaces";

import { Content, Container, GroupCardList, NoTopicsCard } from "./styles";

const Dashboard = () => {
  const [groups, setGroups] = useState<Groups[]>([]);
  const [userId, SetUserId] = useState<number | null>();
  const { name, id } = useAuth();
  const { asyncCreateRequest, dispatch } = useGroups();
  const navigate = useNavigate();

  const openGroup = useCallback((id: number) => {
    navigate(`/group/${id}`);
  }, []);

  const openTopic = useCallback((groupId: number, topicId: number) => {
    navigate(`/topics/${Number(groupId)}/${Number(topicId)}`);
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
    } catch (err) {
      return err;
    }
  }, []);

  const requestEnterInGroup = async (groupId: number) => {
    await asyncCreateRequest(groupId, dispatch);
    const currentGroup = groups.find(({ id }) => id === groupId);
    const isMember = currentGroup?.members.find(({ id }) => id === userId);
    const requestExists = currentGroup?.requesters?.find(
      ({ id }) => id === userId
    );
    const isBanned = currentGroup?.bans?.find(({ id }) => id === userId);
    const isPrivate = currentGroup?.is_private;

    if (isBanned) {
      return ToastError("Você não pode entrar pois foi banido desse grupo");
    } else if (isPrivate && !isMember && requestExists) {
      return ToastMessage(
        "Você já aplicou entrada a esse grupo, espere alguém da administração aprovar sua entrada"
      );
    } else if (isPrivate && !isMember) {
      return ToastMessage(
        "Pedido de entrada enviado, aguarde até que um moderador aceite."
      );
    } else {
      ToastSuccess("Entrada realizada com sucesso");
      setTimeout(() => {
        return navigate(`/group/${groupId}`);
      }, 1000);
    }
  };

  function isAlreadyMember(groupId: number) {
    const currentGroup = groups.find(({ id }) => id === groupId);

    const isMember = currentGroup?.members.find(({ id }) => id === userId);

    if (!isMember) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    SetUserId(Number(id));
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
                  onClickEnter={() => {
                    requestEnterInGroup(group.id);
                  }}
                  key={index}
                  groupOwner={group.administrator.name}
                  groupName={group.name}
                  groupStatus={
                    group.is_private ? `${`Privado`}` : `${`Público`}`
                  }
                  numberOfMbembers={group.members.length}
                  statusColor={group.is_private ? `${`red`}` : `${`green`}`}
                  numberOfTopics={group.topics.length}
                  groupImage={group.avatar.path}
                  CardButtonTextEnter="Entrar"
                  CardButtonTextView="Ver Grupo"
                  cardButtonTextEnterVisible={isAlreadyMember(group.id)}
                  ButtonViewGroupVisible={
                    !group.is_private ||
                    (group.is_private && !isAlreadyMember(group.id))
                  }
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
