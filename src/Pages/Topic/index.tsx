/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { type AxiosResponse } from "axios";
import api from "../../services/api";
import { type GroupTopic } from "../../Contexts/TopicContext/interfaces";
import { type comments } from "../../services/interfaces";
import Button from "../../Components/Button";

import image from "../../assets/images/fibonacci.jpg";
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
} from "./styles";

const TopicPage = () => {
  const [groupTopic, setTopic] = useState<Partial<GroupTopic>>({});
  const [commentBoxOpenned, setCommentBoxOppened] = useState(false);
  const [comment, setComment] = useState("");
  const [commentList, setCommentlist] = useState<comments[]>([]);
  const [total, setTotal] = useState(5);
  const [limit, setLimit] = useState(1);
  const [pages, setPages] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const params = useParams();
  const { group_id, topic_id } = params;

  const getTopicByCredentials = useCallback(async () => {
    const token = localStorage.getItem("@token");

    if (!token) {
      return;
    }

    try {
      const res: AxiosResponse<GroupTopic> = await api.get<
        GroupTopic,
        AxiosResponse<GroupTopic>
      >(`/topics/${Number(group_id)}/${Number(topic_id)}?page=${0}&size=${1}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const totalPages = Math.ceil(total / limit);
      const arrayPages = [];

      for (let i = 1; i <= totalPages; i++) {
        arrayPages.push(i);
      }

      setPages(arrayPages);
      setCommentlist(res.data.topics[0].comments);

      setTopic({ ...res.data });
    } catch (err) {
      return err;
    }
  }, [groupTopic, commentList]);

  const postNewComment = () => {
    const userName = localStorage.getItem("@name:user");
    if (userName) {
      setCommentlist([
        ...commentList,
        { author: { name: userName, id: 0 }, body: comment, id: 55 },
      ]);
    } else {
      throw new Error("Erro inesperado, tente novamente");
    }
  };

  const addNewComment = useCallback(() => {
    setCommentBoxOppened(!commentBoxOpenned);
  }, [commentBoxOpenned]);

  const postComment = useCallback(async () => {
    const token = localStorage.getItem("@token");

    if (!token) {
      return;
    }

    try {
      const res: AxiosResponse<GroupTopic> = await api.post<
        GroupTopic,
        AxiosResponse<GroupTopic>
      >(`/comments/:group_id/:topic_id`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.status;
    } catch (err) {
      return err;
    }
  }, []);

  const changeComment = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      e.preventDefault();
      setComment(e.currentTarget.value);
      console.log(comment);
    },
    [comment]
  );

  useEffect(() => {
    void getTopicByCredentials();
  }, []);
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
                          <AuthorAvatar src={image} />
                        </UserInfoArea>
                        <CommentContent>{comment.body}</CommentContent>
                      </Comment>
                    );
                  })}
                  {commentBoxOpenned && <CommentBox onChange={changeComment} />}
                  <ButtonArea>
                    {commentBoxOpenned && (
                      <Button
                        width="150px"
                        onClick={() => {
                          postNewComment();
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
            <div>{commentList.length}</div>
            <PaginationButton>
              <PaginationItem>Previous</PaginationItem>
              {pages.map((page) => (
                <>
                  <PaginationItem
                    key={page}
                    onClick={() => {
                      setCurrentPage(page);
                    }}
                  >
                    {page}
                  </PaginationItem>
                </>
              ))}
              <PaginationItem>Next</PaginationItem>
            </PaginationButton>
          </Pagination>
        </>
      </Container>
    </>
  );
};

export default TopicPage;
