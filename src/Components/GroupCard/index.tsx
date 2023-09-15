import React from "react";
import image from "../../assets/images/csgo.jpg";

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
}

const GroupCard = ({
  children,
  groupName,
  numberOfMbembers,
  numberOfTopics,
  onClick,
}: IGrupoCardProps) => {
  return (
    <Container onClick={onClick}>
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
        <GroupAvatar src={image} />
      </GroupCardHeader>

      <TopicList>{children}</TopicList>
      <ButtonArea>
        <JoiningButton>Entrar</JoiningButton>
      </ButtonArea>
    </Container>
  );
};

export default GroupCard;
