/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import React, { useEffect, useState, useCallback } from "react";
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
  const params = useParams();
  const [group, setGroup] = useState<Partial<Groups>>({});
  const [createTopic, setCreateTopic] = useState<boolean>(false);
  const [groupId, setGroupId] = useState<string>("");
  const [isOwner, setIsOwner] = useState<object | null>(null);
  const [DialogIsVisible, SetDialogIsVisible] = useState<boolean>(false);
  const [contentName, setContentName] = useState<string>("topics");
  const [limit, setLimit] = useState(5);
  const [pages, setPages] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState<number | undefined>(0);

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
    const token = localStorage.getItem("@token");

    if (!token) {
      return;
    }

    try {
      const res: AxiosResponse<Response> = await api.get<
        Response,
        AxiosResponse<Response>
      >(
        `groups/${Number(group_id)}?page=${Number(currentPage)}&size=${Number(
          limit
        )}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const { group, numberOfTopics, isOwner, numberOfMembers } = res.data;

      console.log("data", res.data);

      setGroup({ ...group });

      if (isOwner) {
        setIsOwner(isOwner);
      }

      if (numberOfMembers) {
        if (contentName === "members") {
          setLimit(2);
        } else if (contentName === "topics") {
          setLimit(5);
        }
        //@ts-ignore
        const totalPages = Math.ceil(total / limit);
        const arrayPages = [];

        for (let i = 1; i <= totalPages; i++) {
          arrayPages.push(i);
        }

        setPages(arrayPages);
        if (contentName === "members") {
          setTotal(numberOfMembers);
        } else if (contentName === "topics") {
          setTotal(numberOfTopics);
        }
      }
    } catch (err) {
      return err;
    }
  };

  const deleteGroup = async () => {
    const token = localStorage.getItem("@token");

    if (!token) {
      return;
    }

    try {
      const res: AxiosResponse<Response> = await api.delete<
        Response,
        AxiosResponse<Response>
      >(`groups/${String(group_id)}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      SetDialogIsVisible(false);

      navigate(`/dashboard`);

      return res.status;
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    console.log(group.members);
    void getGroupsByUser();

    generateContent();

    if (group_id) {
      setGroupId(group_id);
    }
  }, [currentPage, limit, total, contentName]);

  const generateContent = () => {
    if (contentName === "topics") {
      return (
        <>
          <div>toópicos</div>
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
            {group?.members?.slice(0, 6).map((member, index) => {
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
        <NavBar>
          <NavBarItem>
            <div
              onClick={() => {
                setContentName("topics");
              }}
            >
              Discussão
            </div>
          </NavBarItem>
          <NavBarItem>
            <div
              onClick={() => {
                setContentName("members");
              }}
            >
              Membros
            </div>
          </NavBarItem>
          <NavBarItem>
            <div
              onClick={() => {
                setContentName("admin");
              }}
            >
              Administradores
            </div>
          </NavBarItem>
          <NavBarItem>
            <div
              onClick={() => {
                setContentName("info");
              }}
            >
              Descrição
            </div>
          </NavBarItem>
        </NavBar>
        {isOwner && (
          <ButtonAdminContainer>
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
          </ButtonAdminContainer>
        )}
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

        <>
          <Pagination>
            <div>{total}</div>
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
                      console.log(currentPage);
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
