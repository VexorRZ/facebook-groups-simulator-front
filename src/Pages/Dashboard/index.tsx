/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React from "react";

import TopBar from "../../Components/TopBar";
import SideMenu from "../../Components/SideMenu";
import GroupCard from "../../Components/GroupCard";
import TopicContent from "../../Components/TopicContent";

import { Content, Container, GroupCardList } from "./styles";
import useAuth from "../../Hooks/useAuth";

const Dashboard = () => {
  const { name } = useAuth();

  return (
    <Container>
      <TopBar />
      <Content>
        <SideMenu />

        <GroupCardList>
          <h1>OLÁ {name} </h1>
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
