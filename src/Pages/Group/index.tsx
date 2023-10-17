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
import {
  Container,
  GroupImage,
  GroupTitle,
  Header,
  TopicList,
  Pagination,
  PaginationButton,
  PaginationItem,
  ButtonArea,
} from "./styles";

const Group = () => {
  const params = useParams();
  const [group, setGroup] = useState<Partial<Groups>>({});
  const [total, setTotal] = useState(0);
  const [limit] = useState(1);
  const [pages, setPages] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [createTopic, setCreateTopic] = useState<boolean>(false);
  const [groupId, setGroupId] = useState<string>("");

  const { group_id } = params;
  const navigate = useNavigate();

  const openTopic = useCallback((topicId: number) => {
    navigate(`/topics/${Number(group_id)}/${topicId}`);
  }, []);

  const openTopicCreate = useCallback(() => {
    setCreateTopic(true);
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

      const { group, numberOfTopics } = res.data;

      console.log(res.data.group?.topics);

      setGroup({ ...group });

      if (numberOfTopics) {
        setTotal(numberOfTopics);
      }

      const totalPages = Math.ceil(total / limit);
      const arrayPages = [];

      for (let i = 1; i <= totalPages; i++) {
        arrayPages.push(i);
      }

      setPages(arrayPages);
    } catch (err) {
      return err;
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
      <Container>
        <Header>
          <GroupTitle>{group.name}</GroupTitle>
          <GroupImage />
        </Header>
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
          <CustomButton onClick={openTopicCreate}>Criar tópico</CustomButton>
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
                  Previous
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
                  Next
                </PaginationItem>
              )}
            </PaginationButton>
          </Pagination>
        </>
        {createTopic && (
          <CreateTopic groupId={groupId} onClick={closeTopicModal} />
        )}
      </Container>
    </>
  );
};

export default Group;
