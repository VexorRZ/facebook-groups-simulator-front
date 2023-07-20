import React from "react";

import {
  Container,
  GroupCardHeader,
  GroupTitle,
  GroupNumberOfMembers,
  TopicList,
  TopicName,
  NumberOfComments,
  TopicContent,
} from "./styles";

const GroupCard = () => {
  return (
    <Container>
      <GroupCardHeader>
        <GroupTitle>Nome do Grupo</GroupTitle>
        <GroupNumberOfMembers> membros: 35</GroupNumberOfMembers>
      </GroupCardHeader>
      <TopicList>
        <TopicContent>
          <TopicName>nome do tópico</TopicName>
          <NumberOfComments>comentários: 40</NumberOfComments>
        </TopicContent>
        <TopicContent>
          <TopicName>nome do tópico</TopicName>
          <NumberOfComments>comentários: 40</NumberOfComments>
        </TopicContent>
        <TopicContent>
          <TopicName>nome do tópico</TopicName>
          <NumberOfComments>comentários: 40</NumberOfComments>
        </TopicContent>
      </TopicList>
    </Container>
  );
};

export default GroupCard;
