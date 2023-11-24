import React from "react";

import {
  Container,
  GroupCardHeader,
  GroupTitle,
  TopicList,
  GroupAvatar,
  GroupInfoArea,
  JoiningButton,
  InfoWrapper,
  ButtonArea,
  AmountWrapper,
  InfoText,
} from "./styles";

interface IGrupoCardProps {
  onClick?: () => void;
  groupName: string;
  numberOfMbembers: number;
  children?: React.ReactNode;
  numberOfTopics: number;
  joiningButtonText: string;
  groupImage?: string;
}

const GroupCard = ({
  children,
  groupName,
  numberOfMbembers,
  numberOfTopics,
  joiningButtonText,
  groupImage,
  onClick,
}: IGrupoCardProps) => {
  return (
    <Container>
      <GroupCardHeader>
        <GroupInfoArea>
          <GroupTitle>Grupo: {groupName}</GroupTitle>
          <InfoWrapper>
            <InfoText>Membros:</InfoText>
            <AmountWrapper>{numberOfMbembers}</AmountWrapper>
          </InfoWrapper>
          <InfoWrapper gap="14px">
            <InfoText>Tópicos:</InfoText>
            <AmountWrapper>{numberOfTopics}</AmountWrapper>
          </InfoWrapper>
        </GroupInfoArea>
        <GroupAvatar src={groupImage} />
      </GroupCardHeader>

      <TopicList>{children}</TopicList>
      <ButtonArea>
        <JoiningButton onClick={onClick}>{joiningButtonText}</JoiningButton>
      </ButtonArea>
    </Container>
  );
};

export default GroupCard;
