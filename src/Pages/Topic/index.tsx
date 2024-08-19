/* eslint-disable spaced-comment */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { type AxiosResponse } from "axios";
import api from "../../services/api";
import {
  type GroupTopic,
  type TopicData,
  type Comments,
} from "../../Contexts/TopicContext/interfaces";
import useAuth from "../../Hooks/useAuth";
import useTopicContext from "../../Hooks/useTopics";
import Button from "../../Components/Button";
import TopBar from "../../Components/TopBar";
import Like from "../../Components/Like";
import TextEditor from "../../Containers/Editor";
import CustomComment from "../../Components/Comment";
import { io } from "socket.io-client";

import {
  Container,
  GroupImage,
  GroupTitle,
  Header,
  CommentList,
  CommentsLists,
  ButtonArea,
  Pagination,
  PaginationButton,
  PaginationItem,
} from "./styles";

const TopicPage = () => {
  const [groupTopic, setTopic] = useState<Partial<TopicData>>({});
  const [commentBoxOpenned, setCommentBoxOppened] = useState(false);
  const [comment, setComment] = useState("");
  const [commentList, setCommentlist] = useState<Comments[]>([]);
  const [liked] = useState(false);
  const [limit] = useState(5);
  const [pages, setPages] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [socket, setSocket] = useState(null);
  const params = useParams();
  const { group_id, topic_id } = params;

  const { userData } = useAuth();

  const { asyncDeleteComment } = useTopicContext();

  const deleteComment = async (
    group_id: number,
    topic_id: number,
    comment_id: number
  ) => {
    try {
      await asyncDeleteComment(group_id, topic_id, comment_id, userData.token);
    } catch (err) {
      console.log(err);
      return;
    } finally {
      if (commentList) {
        const newCommentList = commentList.filter(
          ({ id }) => id !== comment_id
        );
        setCommentlist(newCommentList);
      }
    }
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
    (value: any) => {
      setComment(value);
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

  const commentHasLike = (commentId: number) => {
    const currentComment = commentList.find(({ id }) => id === commentId);

    const userLikeExists = currentComment?.commentLikes.find(
      ({ author_id }) => author_id === Number(userData.id)
    );

    return userLikeExists;
  };

  const currentUserIsMember = () => {
    const isMember = groupTopic.members?.find(
      ({ id }) => id === Number(userData.id)
    );

    if (isMember) {
      return true;
    } else {
      return false;
    }
  };

  const currentUserIsAuthor = (commentId: number) => {
    const currentCumment = commentList.find(({ id }) => id === commentId);

    if (currentCumment?.author.id === Number(userData.id)) {
      return true;
    } else {
      return false;
    }
  };

  const handleNotification = (commentAuthorName: string, type: number) => {
    console.log("enviando notificação");
    // @ts-expect-error
    socket.emit("sendNotification", {
      senderName: userData.name,
      receiverName: commentAuthorName,
      type,
    });
  };

  useEffect(() => {
    void getTopicByCredentials();
    //@ts-expect-error
    setSocket(io("http://localhost:3333"));
  }, [currentPage, limit, total, liked]);

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
                <h2 key={index}>{topic.name}</h2>
                <div className="authorWrapper">
                  <h3>Autor:</h3> <h4>{topic.author.name}</h4>
                </div>
                <CommentsLists>
                  {commentList.map((comment, index) => {
                    return (
                      <div
                        key={index}
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <CustomComment
                          userIsAuthor={Boolean(
                            currentUserIsAuthor(comment.id)
                          )}
                          key={index}
                          body={comment.body}
                          authorAvatar={comment.author.avatar.path}
                          authorName={comment.author.name}
                          onClick={() => {
                            void deleteComment(
                              Number(group_id),
                              Number(topic_id),
                              comment.id
                            );
                          }}
                        />
                        <Like
                          hasLike={Boolean(commentHasLike(comment.id))}
                          onClickParent={async () => {
                            await updateLike(comment.id);
                            handleNotification(comment.author.name, 1);
                          }}
                          likeAmount={comment.commentLikes.length}
                        />
                      </div>
                    );
                  })}
                  {commentBoxOpenned && <TextEditor onChange={changeComment} />}

                  {currentUserIsMember() && (
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
                  )}
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
