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
import useAuth from "../../Hooks/useAuth";
import { type Comments } from "../../Contexts/TopicContext/interfaces";
import heart from "../../assets/icons/heart.svg";
import heartFilled from "../../assets/icons/heartFilled.svg";
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
  const [commentList, setCommentlist] = useState<Comments[]>([]);
  const [liked, setLiked] = useState(false);
  const [limit] = useState(5);
  const [pages, setPages] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  const params = useParams();
  const { group_id, topic_id } = params;

  const { userData } = useAuth();

  const handleNotification = (commentId: number) => {
    const findComment = commentList.find(({ id }) => id === commentId);
    setLiked(!liked);
  };

  const getTopicByCredentials = async () => {
    if (!userData?.token) {
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
          headers: { Authorization: `Bearer ${userData.token}` },
        }
      );

      const { totalCount } = res.data;

      console.log("dataTopic", res.data);

      if (totalCount) {
        const totalPages = Math.ceil(totalCount / limit);
        const arrayPages = [];

        for (let i = 1; i <= totalPages; i++) {
          arrayPages.push(i);
        }

        setPages(arrayPages);
        setTotal(totalCount);
      }

      //@ts-ignore
      setCommentlist(res.data.groupTopics.topics[0].comments);

      setTopic({ ...res.data.groupTopics });
    } catch (err) {
      return err;
    }
  };

  const postNewComment = async () => {
    if (userData?.name) {
      setCommentlist([
        ...commentList,
        {
          id: 0,
          author: {
            name: userData.name,
            id: Number(userData.id),
            avatar: { path: userData.avatar.path },
          },
          body: comment,
          commentLikes: [],
        },
      ]);

      if (!userData.token) {
        throw new Error("Erro inesperado, token não fornecido");
      }

      setCommentBoxOppened(false);

      try {
        const res: AxiosResponse = await api.post<AxiosResponse>(
          `/comments/${Number(group_id)}/${Number(topic_id)}`,
          {
            headers: { Authorization: `Bearer ${userData.token}` },
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

  const updateLike = async (commentId: number) => {
    try {
      const res: AxiosResponse<GroupTopic> = await api.put<
        GroupTopic,
        AxiosResponse<GroupTopic>
      >(`comments_likes/${Number(userData.id)}/${Number(commentId)}`, {
        headers: { Authorization: `Bearer ${userData.token}` },
      });
      return res;
    } catch (err) {
      return err;
    }
  };

  const userGaveLike = (commmentId: number) => {
    const currentComment = commentList.find(({ id }) => (id = commmentId));

    const userLikeExists = currentComment?.commentLikes.find(
      ({ author_id, comment_id }) =>
        author_id === Number(userData.id) && comment_id === commmentId
    );

    if (!userLikeExists) {
      return (
        <img
          src={heart}
          alt=""
          onClick={() => {
            updateLike(commmentId);
          }}
        />
      );
    } else {
      return (
        <img
          src={heartFilled}
          alt=""
          onClick={() => {
            updateLike(commmentId);
            console.log("clicked on:", commmentId);
          }}
        />
      );
    }
  };

  useEffect(() => {
    void getTopicByCredentials();
  }, [currentPage, limit, total]);
  return (
    <>
      <TopBar socket={""} />
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

                        {userGaveLike(comment.id)}

                        {<div>{comment.commentLikes.length}</div>}
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
