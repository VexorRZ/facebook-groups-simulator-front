import React from "react";

import {
  Container,
  GroupCardHeader,
  GroupTitle,
  GroupNumberOfMembers,
  TopicList,
} from "./styles";

interface IGrupoCardProps {
  groupName: string;
  numberOfMbembers: number;
  children?: React.ReactNode;
}

const GroupCard = ({
  children,
  groupName,
  numberOfMbembers,
}: IGrupoCardProps) => {
  return (
    <Container>
      <GroupCardHeader>
        <GroupTitle>{groupName}</GroupTitle>
        <GroupNumberOfMembers> {numberOfMbembers}</GroupNumberOfMembers>
      </GroupCardHeader>
      <TopicList>{children}</TopicList>
    </Container>
  );
};

export default GroupCard;
