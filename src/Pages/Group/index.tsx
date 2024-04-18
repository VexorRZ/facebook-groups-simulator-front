/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import React, { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { type AxiosResponse } from "axios";
import { type Groups, type Response } from "../../services/interfaces";
import Topic from "../../Components/TopicContent";
import CustomButton from "../../Components/Button";
import CreateTopic from "../../Containers/CreateTopic";
import TopBar from "../../Components/TopBar";
import DialogBox from "../../Containers/DialogBox";
import PublicIcon from "@mui/icons-material/Public";
import GroupContainer from "../../Containers/GroupContainer";
import Loader from "../../Components/Loader";
import useAuth from "../../Hooks/useAuth";
import useGroup from "../../Hooks/useGroups";
import { Members } from "../../Contexts/GroupMembersContext/interfaces";
import useGroupMembers from "../../Hooks/useMembers";
import { asyncGetGroupMembers } from "../../Contexts/GroupContext/middlewares";

import {
  GroupImage,
  GroupTitle,
  Header,
  TopicList,
  Pagination,
  PaginationButton,
  PaginationItem,
  ButtonArea,
  ButtonAdminContainer,
  ButtonAdminWrapper,
  GroupInfo,
  NavBar,
  NavBarItem,
  UserCard,
  UserCardPic,
} from "./styles";

const Group = () => {
  const [group, setGroup] = useState<Partial<Groups>>({});
  //@ts-ignore
  const [groupMembers, setGroupMembers] = useState<Members[]>([]);
  const [createTopic, setCreateTopic] = useState<boolean>(false);
  const [groupId, setGroupId] = useState<string>("");
  const [isOwner, setIsOwner] = useState<object | null>(null);
  const [DialogIsVisible, SetDialogIsVisible] = useState<boolean>(false);
  const [contentName, setContentName] = useState<string>("topics");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [index, setIndex] = useState(2);
  const [limit, setLimit] = useState(5);
  const [pages, setPages] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState<number | undefined>(0);
  const loaderRef = useRef(null);

  const params = useParams();
  const { groupData, asyncGetGroupMembers, dispatch } = useGroup();
  const { membersData, membersDispatch } = useGroupMembers();
  const { userData } = useAuth();

  const { group_id } = params;

  const navigate = useNavigate();

  const openTopic = useCallback((topicId: number) => {
    navigate(`/topics/${Number(group_id)}/${topicId}`);
  }, []);

  const openTopicCreate = useCallback(() => {
    setCreateTopic(true);
  }, []);

  const toggleDialogBOx = useCallback((value: boolean) => {
    SetDialogIsVisible(value);
  }, []);

  const closeTopicModal = useCallback(() => {
    setCreateTopic(false);
  }, []);

  const getGroupsByUser = async () => {
    if (!userData?.token) {
      return;
    }

    try {
      setIsLoading(true);
      const res: AxiosResponse<Response> = await api.get<
        Response,
        AxiosResponse<Response>
      >(
        `groups/${Number(group_id)}?page=${Number(currentPage)}&size=${Number(
          limit
        )}`,
        {
          headers: { Authorization: `Bearer ${userData?.token}` },
        }
      );

      const { group, numberOfTopics, isOwner } = res.data;

      // console.log("data", res.data);
      console.log("groupdata", group);
      setGroup({ ...group });

      if (isOwner) {
        setIsOwner(isOwner);
      }

      // if (contentName === "members") {
      //   setLimit(2);
      // } else if (contentName === "topics") {
      //   setLimit(5);
      // }
      //@ts-ignore
      const totalPages = Math.ceil(total / limit);
      const arrayPages = [];

      for (let i = 1; i <= totalPages; i++) {
        arrayPages.push(i);
      }

      setPages(arrayPages);

      setTotal(numberOfTopics);

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      return err;
    }
  };

  const fetchMembers = useCallback(() => {
    try {
      setIsLoading(true);

      asyncGetGroupMembers(Number(groupId), dispatch);

      //@ts-ignore
      // setGroupMembers((prevMembers) => [[...prevMembers], [...membersData]]);
      //  setGroupMembers([...membersData]);

      //@ts-ignore

      // setGroupMembers((prevMembers) => [
      //   ...(Array.isArray(prevMembers) ? prevMembers : []),
      //   //@ts-ignore
      //   ...membersData,
      // ]);

      // setIndex((prevIndex) => prevIndex + 1);

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  }, [index, isLoading]);

  // useEffect(() => {
  //   const observer = new IntersectionObserver((entries) => {
  //     const target = entries[0];
  //     if (target.isIntersecting) {
  //       fetchMembers();
  //     }
  //   });

  //   if (loaderRef.current) {
  //     observer.observe(loaderRef.current);
  //   }

  //   return () => {
  //     if (loaderRef.current) {
  //       observer.unobserve(loaderRef.current);
  //     }
  //   };
  // }, [fetchMembers]);

  // useEffect(() => {
  //   const getMembers = () => {
  //     setIsLoading(true);

  //     try {
  //       asyncGetGroupMembers(Number(group_id), currentPage, limit, dispatch);

  //       //@ts-ignore
  //       setGroupMembers(groupState.members);
  //     } catch (err) {
  //       setIsLoading(false);
  //     }

  //     setIsLoading(false);
  //   };

  //   getMembers();
  // }, []);

  useEffect(() => {
    void getGroupsByUser();

    fetchMembers();

    generateContent();

    if (group_id) {
      setGroupId(group_id);
    }

    //@ts-ignore
    //    setGroupMembers([...membersData]);
    //  console.log("groupdata no grupo", membersData);
  }, [currentPage, limit, total, contentName]);

  const deleteGroup = async () => {
    if (!userData?.token) {
      return;
    }

    try {
      const res: AxiosResponse<Response> = await api.delete<
        Response,
        AxiosResponse<Response>
      >(`groups/${String(group_id)}`, {
        headers: { Authorization: `Bearer ${userData?.token}` },
      });

      SetDialogIsVisible(false);

      navigate(`/dashboard`);

      return res.status;
    } catch (err) {
      return err;
    }
  };

  const generateContent = () => {
    if (contentName === "topics") {
      return (
        <>
          <div>tópicos</div>

          {group?.topics?.length !== 0 ? (
            <>
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
              </TopicList>
              <ButtonArea>
                <CustomButton
                  onClick={openTopicCreate}
                  width="130px"
                  height="40px"
                >
                  Criar tópico
                </CustomButton>
              </ButtonArea>

              <Pagination>
                <div>{total} tópicos criados</div>
                <PaginationButton>
                  {currentPage > 1 && (
                    <PaginationItem
                      onClick={() => {
                        setCurrentPage(currentPage - 1);
                      }}
                    >
                      Anterior
                    </PaginationItem>
                  )}
                  {pages.map((page) => (
                    <>
                      <PaginationItem
                        isSelect={page === currentPage}
                        key={page}
                        onClick={() => {
                          setCurrentPage(Number(page));
                        }}
                      >
                        {page}
                      </PaginationItem>
                    </>
                  ))}
                  {currentPage < pages.length && (
                    <PaginationItem
                      onClick={() => {
                        setCurrentPage(currentPage + 1);
                      }}
                    >
                      Próxima
                    </PaginationItem>
                  )}
                </PaginationButton>
              </Pagination>
            </>
          ) : (
            <div>Nenhum tópico criado ainda</div>
          )}
        </>
      );
    }
    if (contentName === "members") {
      return (
        <>
          <div>members</div>

          <TopicList>
            {groupMembers?.map((member, index) => {
              return (
                <UserCard key={index}>
                  <UserCardPic
                    src={member.avatar?.path ? member.avatar?.path : ""}
                  />
                  <strong>{member.name}</strong>
                </UserCard>
              );
            })}
          </TopicList>
        </>
      );
    }
    if (contentName === "admin") {
      return (
        <>
          <div>admin</div>
          {group?.moderators?.length !== 0 ? (
            <>
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
              </TopicList>
              <ButtonArea>
                <CustomButton
                  onClick={openTopicCreate}
                  width="130px"
                  height="40px"
                >
                  Criar tópico
                </CustomButton>
              </ButtonArea>
            </>
          ) : (
            <div>Nenhum tópico criado ainda</div>
          )}
        </>
      );
    } else {
      return (
        <>
          <div>info</div>
        </>
      );
    }
  };

  return (
    <>
      <TopBar />
      <GroupContainer>
        <div ref={loaderRef}>{<Loader /> && isLoading}</div>
        <ButtonAdminContainer>
          <img src={group.avatar?.path ? group.avatar.path : "alt"} />
          <NavBar>
            <NavBarItem>
              <strong
                onClick={() => {
                  setContentName("topics");
                }}
              >
                Discussão
              </strong>
            </NavBarItem>
            <NavBarItem>
              <strong
                onClick={() => {
                  setContentName("members");
                }}
              >
                Membros
              </strong>
            </NavBarItem>
            <NavBarItem>
              <strong
                onClick={() => {
                  setContentName("admin");
                }}
              >
                Administradores
              </strong>
            </NavBarItem>
            <NavBarItem>
              <strong
                onClick={() => {
                  setContentName("info");
                }}
              >
                Descrição
              </strong>
            </NavBarItem>
          </NavBar>
          {isOwner && (
            <ButtonAdminWrapper>
              <CustomButton
                width="90px"
                height="30px"
                onClick={() => {
                  toggleDialogBOx(true);
                }}
              >
                Deletar
              </CustomButton>
              <CustomButton
                width="90px"
                height="30px"
                onClick={() => {
                  toggleDialogBOx(true);
                }}
              >
                Editar
              </CustomButton>
            </ButtonAdminWrapper>
          )}
        </ButtonAdminContainer>
        <Header>
          <GroupTitle>{group.name}</GroupTitle>
          <GroupInfo>
            <PublicIcon />
            <GroupTitle> grupo público</GroupTitle>
            <div />
            <GroupTitle>{group.members?.length} membros</GroupTitle>
          </GroupInfo>

          <GroupImage />
        </Header>

        {generateContent()}

        {createTopic && (
          <CreateTopic groupId={groupId} onClick={closeTopicModal} />
        )}
        {DialogIsVisible && (
          <DialogBox
            visible={DialogIsVisible}
            onCancel={() => {
              toggleDialogBOx(false);
            }}
            onConfirm={() => {
              void deleteGroup();
            }}
          />
        )}
      </GroupContainer>
    </>
  );
};

export default Group;
