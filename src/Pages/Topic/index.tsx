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
} from "./styles";
import TopBar from "../../Components/TopBar";

const TopicPage = () => {
  const params = useParams();
  const [groupTopic, setTopic] = useState<Partial<GroupTopic>>({});
  const [commentBoxOpenned, setCommentBoxOppened] = useState(false);
  const [comment, setComment] = useState("");
  const [commentList, setCommentlist] = useState<comments[]>([]);

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
      >(`/topics/${Number(group_id)}/${Number(topic_id)}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCommentlist(res.data.topics[0].comments);

      setTopic({ ...res.data });
    } catch (err) {
      return err;
    }
  }, [groupTopic]);

  const postNewComment = useCallback(() => {
    setCommentlist([
      ...commentList,
      { author: { name: "zé", id: 0 }, body: comment, id: 55 },
    ]);
    console.log(commentList);
  }, [commentList]);

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
                <div>{topic.name}</div>
                <div>Criador do tópico {topic.author.name}</div>
                <CommentsLists>
                  {commentList.map((comment, index) => {
                    return (
                      <Comment key={comment.id}>
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
      </Container>
    </>
  );
};

export default TopicPage;
