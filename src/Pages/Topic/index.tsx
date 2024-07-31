/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { type AxiosResponse } from "axios";
import api from "../../services/api";
//require("dotenv").config();
//import Pusher from "pusher-js";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import DOMPurify from "dompurify";
import {
  type GroupTopic,
  type TopicData,
  type Comments,
} from "../../Contexts/TopicContext/interfaces";
import useAuth from "../../Hooks/useAuth";

import Button from "../../Components/Button";
import TopBar from "../../Components/TopBar";
import Like from "../../Components/Like";
import TextEditor from "../../Containers/Editor";

// import { io } from "socket.io-client";

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
  Comment,
  Pagination,
  PaginationButton,
  PaginationItem,
  CommentDate,
  CommentDetailsWrapper,
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
  const [socket] = useState<any>(null);
  const [user] = useState({});

  const params = useParams();
  const { group_id, topic_id } = params;

  const { userData } = useAuth();

  // useEffect(() => {
  //   setSocket(io("http://localhost:3333", { transports: ["websocket"] }));
  //   setUser(userData);
  // }, []);

  // const handleNotification = (commentId: number, type: any) => {
  //   const findComment = commentList.find(({ id }) => id === commentId);

  //   socket?.emit("sendNotification", {
  //     senderName: userData.name,
  //     receiverName: findComment?.author,
  //     type,
  //   });
  // };

  // useEffect(() => {
  //   //@ts-ignore
  //   const pusher = new Pusher(process.env.PUSHER_APP_KEY, {
  //     cluster: "mt1",
  //   });

  //   let socketId;

  //   pusher.connection.bind("connected", function () {
  //     socketId = pusher.connection.socket_id;
  //   });

  //   const channel = pusher.subscribe("comment-events");
  //   channel.bind("likeAction", function (data: any) {
  //     console.log(data);
  //     var action = data.action;
  //     //     updatePostStats[action](data.postId);
  //   });

  //   return () => {
  //     pusher.unsubscribe("comment-events");
  //     // pusher.unsubscribe('channel_name2')
  //   };

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

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
    //console.log("commentário clicado indexof", currentComment);

    // if (likeExists) {
    //   const commentPLus1 = currentComment?.commentLikes.length;
    //   if (commentPLus1) {
    //     commentPLus1 + 1;
    //   }
    // } else {
    //   const commentLess1 = currentComment?.commentLikes.length;
    //   if (commentLess1) {
    //     commentLess1 - 1;
    //   }
    // }

    try {
      const res: AxiosResponse<GroupTopic> = await api.put<
        GroupTopic,
        AxiosResponse<GroupTopic>
      >(`comments_likes/${Number(userData.id)}/${Number(commentId)}`, {
        headers: { Authorization: `Bearer ${userData.token}` },
      });

      // const currentComment = commentList.find(({ id }) => id === commentId);

      // if (currentComment?.id) {
      //   var commentPos = commentList
      //     .map((comment) => {
      //       return comment.id;
      //     })
      //     .indexOf(currentComment?.id);

      // if (commentPos > -1) {
      //   const commentSelected = commentList.splice(commentPos, 1);

      //   const likeExists = commentHasLike(commentId);

      //   if (!likeExists) {
      //     //@ts-ignore
      //     currentComment.commentLikes.push(res.data);

      //     setCommentlist([...commentList, currentComment]);

      //     console.log("estrutura newcommnet", commentList);
      //   } else {
      //     //@ts-ignore

      //     commentSelected[0].commentLikes.filter(
      //       ({ author_id }) => author_id !== Number(userData.id)
      //     );

      //     // const currentCommentLike = commentSelected[0].commentLikes.find(
      //     //   ({ author_id }) => author_id === Number(userData.id)
      //     // );

      //     // if (currentCommentLike?.id) {
      //     //   var commentLikepos = commentSelected[0].commentLikes
      //     //     .map((like) => {
      //     //       return like.id;
      //     //     })
      //     //     .indexOf(currentCommentLike.id);

      //     //   if (commentLikepos) {
      //     //   }
      //     // }

      //     // commentSelected[0].commentLikes.splice();
      //   }
      // }
      // }

      console.log("likes no comentário", res);
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

  useEffect(() => {
    void getTopicByCredentials();
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
                      <Comment key={index} socket={socket} user={user}>
                        <UserInfoArea>
                          <CommentAuthor>{comment.author.name}:</CommentAuthor>
                          <AuthorAvatar
                            src={
                              comment.author.avatar?.path
                                ? comment.author.avatar.path
                                : ""
                            }
                          />
                        </UserInfoArea>
                        <CommentContent
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(comment.body),
                          }}
                        />
                        <CommentDetailsWrapper>
                          <CommentDate>
                            Postado:
                            {format(
                              new Date(
                                comment.createdAt
                                  ? comment.createdAt
                                  : new Date()
                              ),
                              "'dia' dd 'de' MMMM', às ' HH:mm'h'",
                              { locale: ptBR }
                            )}
                          </CommentDate>
                          <div className="likeWrapper">
                            <Like
                              hasLike={Boolean(commentHasLike(comment.id))}
                              onClickParent={async () => {
                                await updateLike(comment.id);
                              }}
                              likeAmount={comment.commentLikes.length}
                            />
                          </div>
                        </CommentDetailsWrapper>
                      </Comment>
                    );
                  })}
                  {commentBoxOpenned && <TextEditor onChange={changeComment} />}

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
