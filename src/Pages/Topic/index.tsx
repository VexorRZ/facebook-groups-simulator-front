/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { type AxiosResponse } from "axios";
import api from "../../services/api";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  type GroupTopic,
  type TopicData,
} from "../../Contexts/TopicContext/interfaces";
import { type comments } from "../../services/interfaces";
import Button from "../../Components/Button";
import TopBar from "../../Components/TopBar";

import {
  Container,
  GroupImage,
  GroupTitle,
  Header,
  CommentList,
  CommentContent,
  CommentsLists,
  ButtonArea,
  CommentAuthor,
  AuthorAvatar,
  UserInfoArea,
  CommentBox,
  Comment,
  Pagination,
  PaginationButton,
  PaginationItem,
  CommentDate,
} from "./styles";

const TopicPage = () => {
  const [groupTopic, setTopic] = useState<Partial<TopicData>>({});
  const [commentBoxOpenned, setCommentBoxOppened] = useState(false);
  const [comment, setComment] = useState("");
  const [commentList, setCommentlist] = useState<comments[]>([]);
  const [limit] = useState(5);
  const [pages, setPages] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  const params = useParams();
  const { group_id, topic_id } = params;

  const getTopicByCredentials = async () => {
    const token = localStorage.getItem("@token");

    if (!token) {
      return;
    }

    try {
      const res: AxiosResponse<GroupTopic> = await api.get<
        GroupTopic,
        AxiosResponse<GroupTopic>
      >(
        `/topics/${Number(group_id)}/${Number(
          topic_id
        )}?page=${currentPage}&size=${limit}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const { totalCount } = res.data;

      if (totalCount) {
        const totalPages = Math.ceil(totalCount / limit);
        const arrayPages = [];

        for (let i = 1; i <= totalPages; i++) {
          arrayPages.push(i);
        }

        setPages(arrayPages);
        setTotal(totalCount);
      }

      setCommentlist(res.data.groupTopics.topics[0].comments);

      setTopic({ ...res.data.groupTopics });
    } catch (err) {
      return err;
    }
  };

  const postNewComment = async () => {
    const userName = localStorage.getItem("@name:user");
    const token = localStorage.getItem("@token");
    const userId = localStorage.getItem("@id:user");
    const avatarPath = localStorage.getItem("@avatarPath:user");
    if (userName) {
      setCommentlist([
        ...commentList,
        {
          author: {
            name: userName,
            id: Number(userId),
            avatar: { path: avatarPath },
          },
          body: comment,
        },
      ]);

      if (!token) {
        throw new Error("Erro inesperado, token não fornecido");
      }

      setCommentBoxOppened(false);
      try {
        const res: AxiosResponse = await api.post<AxiosResponse>(
          `/comments/${Number(group_id)}/${Number(topic_id)}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            body: comment,
          }
        );

        return res.status;
      } catch (err) {
        return err;
      }
    } else {
      throw new Error("Erro inesperado, tente novamente");
    }
  };

  const addNewComment = useCallback(() => {
    setCommentBoxOppened(!commentBoxOpenned);
  }, [commentBoxOpenned]);

  const changeComment = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      e.preventDefault();
      setComment(e.currentTarget.value);
    },
    [comment]
  );

  useEffect(() => {
    void getTopicByCredentials();
    console.log(commentList);
  }, [currentPage, limit, total]);
  return (
    <>
      <TopBar />
      <Container>
        <Header>
          <GroupTitle>{groupTopic.name}</GroupTitle>
          <GroupImage />
        </Header>
        <CommentList>
          {groupTopic.topics?.map((topic, index) => {
            return (
              <>
                <div key={index}>{topic.name}</div>
                <div>Criador do tópico {topic.author.name}</div>
                <CommentsLists>
                  {commentList.map((comment, index) => {
                    return (
                      <Comment key={index}>
                        <UserInfoArea>
                          <CommentAuthor className="author">
                            {comment.author.name}:
                          </CommentAuthor>
                          <AuthorAvatar
                            src={
                              comment.author.avatar?.path
                                ? comment.author.avatar.path
                                : ""
                            }
                          />
                        </UserInfoArea>
                        <CommentContent>{comment.body}</CommentContent>
                        <CommentDate>
                          Postado:
                          {format(
                            new Date(
                              comment.createdAt ? comment.createdAt : new Date()
                            ),
                            "'dia' dd 'de' MMMM', às ' HH:mm'h'",
                            { locale: ptBR }
                          )}
                        </CommentDate>
                      </Comment>
                    );
                  })}
                  {commentBoxOpenned && <CommentBox onChange={changeComment} />}
                  <ButtonArea>
                    {commentBoxOpenned && (
                      <Button
                        width="150px"
                        onClick={() => {
                          void postNewComment();
                        }}
                      >
                        Postar
                      </Button>
                    )}
                    <Button
                      width="150px"
                      onClick={() => {
                        addNewComment();
                      }}
                    >
                      {!commentBoxOpenned
                        ? `${`Adicionar comentário`}`
                        : `${`cancelar`}`}
                    </Button>
                  </ButtonArea>
                </CommentsLists>
              </>
            );
          })}
        </CommentList>
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
      </Container>
    </>
  );
};

export default TopicPage;
