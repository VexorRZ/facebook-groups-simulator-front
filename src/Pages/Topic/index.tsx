/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { type AxiosResponse } from "axios";
import api from "../../services/api";
import { type GroupTopic } from "../../Contexts/TopicContext/interfaces";
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

      console.log(res.data);

      setTopic({ ...res.data });
      console.log(groupTopic);
    } catch (err) {
      return err;
    }
  }, []);

  const addNewComment = useCallback(() => {
    setCommentBoxOppened(!commentBoxOpenned);
  }, [commentBoxOpenned]);

  const postComment = useCallback(async () => {
    // const myArray = groupTopic.topics?.map((topics) => {
    //   return topics.comments.map((comment) => {
    //     return comment.body;
    //   });
    // });

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
                  {topic.comments.map((comment, index) => {
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
                          void postComment();
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
