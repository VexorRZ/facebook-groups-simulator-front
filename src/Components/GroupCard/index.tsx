import React from "react";

import {
  Container,
  GroupCardHeader,
  GroupTitle,
  GroupNumberOfMembers,
  TopicList,
} from "./styles";

interface IGrupoCardProps {
  onClick?: () => void;
  groupName: string;
  numberOfMbembers: number;
  children?: React.ReactNode;
}

const GroupCard = ({
  children,
  groupName,
  numberOfMbembers,
  onClick,
}: IGrupoCardProps) => {
  return (
    <Container onClick={onClick}>
      <GroupCardHeader>
        <GroupTitle>{groupName}</GroupTitle>
        <GroupNumberOfMembers> {numberOfMbembers}</GroupNumberOfMembers>
      </GroupCardHeader>
      <TopicList>{children}</TopicList>
    </Container>
  );
};

export default GroupCard;
