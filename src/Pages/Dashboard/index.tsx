/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
/* eslint-disable spaced-comment */
/* eslint-disable multiline-ternary */
import React, { useEffect, useState, useCallback, useRef } from "react";

import { type AxiosResponse } from "axios";
import TopBar from "../../Components/TopBar";
import SideMenu from "../../Components/SideMenu";
import GroupCard from "../../Containers/GroupCard";
import TopicContent from "../../Components/TopicContent";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import useAuth from "../../Hooks/useAuth";
import useGroups from "../../Hooks/useGroups";
import Loader from "../../Components/Loader";

import {
  ToastError,
  ToastSuccess,
  ToastMessage,
} from "../../Components/ToastContainer/ToastMessages";

import { type Groups } from "../../Contexts/GroupContext/interfaces";

import { Content, Container, GroupCardList, NoTopicsCard } from "./styles";

const Dashboard = () => {
  const [loadedGroups, setGroups] = useState<Groups[]>([]);
  const [userId, SetUserId] = useState<number | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [index, setIndex] = useState(2);
  const [lastData, setLastData] = useState<boolean>(false);
  // const [socket, setSocket] = useState<any>(null);
  // const [user, setUser] = useState({});
  const loaderRef = useRef(null);

  const { userData } = useAuth();

  const {
    asyncCreateRequest,
    dispatch,
    asyncGetGroups,
    // asyncGetMoreGroups,
    // groupData,
  } = useGroups();

  const navigate = useNavigate();

  const openGroup = useCallback((id: number) => {
    navigate(`/group/${id}`);
  }, []);

  const openTopic = useCallback((groupId: number, topicId: number) => {
    navigate(`/topics/${Number(groupId)}/${Number(topicId)}`);
  }, []);

  const getMoreGroups = useCallback(async () => {
    if (!userData?.token) {
      return;
    }

    if (lastData) {
      return;
    }

    if (isLoading) {
      return;
    }

    setIsLoading(true);

    const response: AxiosResponse<Groups> = await api.get<
      Groups,
      AxiosResponse<Groups>
    >(`groups/?page=${String(index)}&size=5`, {
      headers: { Authorization: `Bearer ${userData?.token}` },
    });

    //  asyncGetMoreGroups(userData.token, String(index), dispatch);

    //const moreGroups = window.localStorage.getItem("@MoreGroups");

    if (response) {
      //   let letMoregroupsData = JSON.parse(moreGroups) as Groups;

      if (response.data.length === 0 || !response.data) {
        setLastData(true);
        setIsLoading(false);
        return;
      } else {
        //@ts-ignore
        setGroups((prevGroups) => [...prevGroups, ...response.data]);

        setIndex((prevIndex) => prevIndex + 1);
        setIsLoading(false);
      }
    }

    setIsLoading(false);
  }, [index, isLoading]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        getMoreGroups();
      }
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [getMoreGroups]);

  useEffect(() => {
    SetUserId(Number(userData?.id));
    const getGroupsByUser = async () => {
      if (!userData?.token) {
        return;
      }

      setIsLoading(true);
      try {
        await asyncGetGroups(userData?.token, dispatch);

        const group = window.localStorage.getItem("@groups");

        if (group) {
          const groupData = JSON.parse(group) as Groups;

          //@ts-ignore
          setGroups((loadedGroups) => [...loadedGroups, ...groupData]);
        }
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };

    getGroupsByUser();
  }, []);

  const requestEnterInGroup = useCallback(async (groupId: number) => {
    await asyncCreateRequest(groupId, dispatch);
    const currentGroup = loadedGroups.find(({ id }) => id === groupId);
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
  }, []);

  function isAlreadyMember(groupId: number) {
    const currentGroup = loadedGroups.find(({ id }) => id === groupId);

    const isMember = currentGroup?.members.find(({ id }) => id === userId);

    if (!isMember) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <Container>
      <TopBar />
      <Content>
        <SideMenu />

        <GroupCardList>
          <h1>Olá {userData.name} </h1>

          {loadedGroups?.map((group, index) => {
            return (
              <>
                <div ref={loaderRef} />
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
          {lastData && (
            <NoTopicsCard>
              Parece que você chegou ao fim, não não há mais nada por enquanto.
            </NoTopicsCard>
          )}
        </GroupCardList>

        {isLoading && <Loader />}
      </Content>
    </Container>
  );
};

export default Dashboard;
