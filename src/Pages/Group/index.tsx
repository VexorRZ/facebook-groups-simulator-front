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
import GroupNavBar from "../../Components/GroupNavBar";
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
  StyledLink,
} from "./styles";

const Group = () => {
  const params = useParams();
  const [group, setGroup] = useState<Partial<Groups>>({});
  const [createTopic, setCreateTopic] = useState<boolean>(false);
  const [groupId, setGroupId] = useState<string>("");
  const [isOwner, setIsOwner] = useState<object | null>(null);
  const [DialogIsVisible, SetDialogIsVisible] = useState<boolean>(false);
  const [limit] = useState(5);
  const [pages, setPages] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

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

      const { group, numberOfTopics, isOwner } = res.data;

      console.log(res.data);

      setGroup({ ...group });

      if (isOwner) {
        setIsOwner(isOwner);
      }

      if (numberOfTopics) {
        const totalPages = Math.ceil(total / limit);
        const arrayPages = [];

        for (let i = 1; i <= totalPages; i++) {
          arrayPages.push(i);
        }

        setPages(arrayPages);
        setTotal(numberOfTopics);
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

  const generateContent = () => {
    if (1) {
      return (
        <>
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
            </>
          ) : (
            <div>Nenhum tópico criado ainda</div>
          )}
        </>
      );
    } else if (2) {
      <>
        {group?.members?.length !== 0 ? (
          <>
            <TopicList>
              {group?.members?.slice(0, 10).map((topic, index) => {
                return <div />;
              })}
            </TopicList>
          </>
        ) : (
          <div>Nenhum usuário neste grupo</div>
        )}
      </>;
    } else if (3) {
      <>
        {group?.moderators?.length !== 0 ? (
          <>
            <TopicList>
              {group?.moderators?.slice(0, 10).map((topic, index) => {
                return <div />;
              })}
            </TopicList>
          </>
        ) : (
          <div>Nenhum usuário neste grupo</div>
        )}
      </>;
    } else if (4) {
      <>
        <div>kkkkkkkkkkkkkkkkkkk</div>
      </>;
    }
  };

  useEffect(() => {
    void getGroupsByUser();

    if (group_id) {
      setGroupId(group_id);
    }
  }, [currentPage, limit, total]);
  return (
    <>
      <TopBar />
      <GroupContainer>
        <NavBar>
          <NavBarItem>
            <StyledLink to="/">Discussão</StyledLink>
          </NavBarItem>
          <NavBarItem>
            <StyledLink to={`/group/${groupId}/members`}>Membros</StyledLink>
          </NavBarItem>
          <NavBarItem>
            <StyledLink to="/">Administradores</StyledLink>
          </NavBarItem>
          <NavBarItem>
            <StyledLink to="/">Descrição</StyledLink>
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
          </>
        ) : (
          <div>Nenhum tópico criado ainda</div>
        )}

        <ButtonArea>
          <CustomButton onClick={openTopicCreate} width="130px" height="40px">
            Criar tópico
          </CustomButton>
        </ButtonArea>
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
