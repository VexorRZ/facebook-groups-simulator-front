/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect, useState } from "react";

import TopBar from "../../Components/TopBar";
import SideMenu from "../../Components/SideMenu";
import GroupCard from "../../Components/GroupCard";
import TopicContent from "../../Components/TopicContent";

import { Content, Container, GroupCardList } from "./styles";

const Dashboard = () => {
  const [userName, setUserName] = useState<string | null>("");

  useEffect(() => {
    const userNameStorage = localStorage.getItem("@name:user");
    if (userNameStorage !== null) {
      setUserName(userNameStorage);
    } else {
      setUserName("Erro ao carregar nome");
    }
  }, []);

  return (
    <Container>
      <TopBar />
      <Content>
        <SideMenu />

        <GroupCardList>
          <h1>OLÁ {userName} </h1>
          <GroupCard groupName="Nome do grupo" numberOfMbembers={10}>
            <TopicContent numberOfComments={35} topicName="nome do tópico" />
            <TopicContent numberOfComments={35} topicName="nome do tópico" />
            <TopicContent numberOfComments={35} topicName="nome do tópico" />
          </GroupCard>
          <GroupCard groupName="Nome do grupo" numberOfMbembers={10}>
            <TopicContent numberOfComments={35} topicName="nome do tópico" />
            <TopicContent numberOfComments={35} topicName="nome do tópico" />
            <TopicContent numberOfComments={35} topicName="nome do tópico" />
          </GroupCard>
          <GroupCard groupName="Nome do grupo" numberOfMbembers={10}>
            <TopicContent numberOfComments={35} topicName="nome do tópico" />
            <TopicContent numberOfComments={35} topicName="nome do tópico" />
            <TopicContent numberOfComments={35} topicName="nome do tópico" />
          </GroupCard>
        </GroupCardList>
      </Content>
    </Container>
  );
};

export default Dashboard;
