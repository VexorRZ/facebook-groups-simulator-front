import React from "react";

import {
  Container,
  GroupCardHeader,
  GroupTitle,
  TopicList,
  GroupAvatar,
  GroupInfoArea,
  CardButton,
  InfoWrapper,
  ButtonArea,
  AmountWrapper,
  InfoText,
  StatusText,
  TitleAndStatus,
  CenterArea,
  StatusWrapper,
} from "./styles";

interface IGrupoCardProps {
  onClickView: () => void;
  onClickEnter: () => void;
  groupName: string;
  numberOfMbembers: number;
  children?: React.ReactNode;
  numberOfTopics: number;
  groupImage?: string;
  isPrivate?: boolean;
  dialogIsVisible?: boolean;
  groupOwner: string;
  groupStatus: string;
  statusColor: string;
  CardButtonTextEnter: string;
  CardButtonTextView: string;
}

const GroupCard = ({
  children,
  groupName,
  numberOfMbembers,
  numberOfTopics,
  CardButtonTextEnter,
  CardButtonTextView,
  groupImage,
  isPrivate,
  groupOwner,
  groupStatus,
  statusColor,
  onClickView,
  onClickEnter,
}: IGrupoCardProps) => {
  return (
    <Container>
      <GroupCardHeader>
        <TitleAndStatus>
          <GroupTitle>Grupo: {groupName}</GroupTitle>
          <StatusWrapper>
            <StatusText>Status:</StatusText>
            <StatusText color={statusColor}>{groupStatus}</StatusText>
          </StatusWrapper>
        </TitleAndStatus>
        <CenterArea>
          <GroupInfoArea>
            <InfoWrapper gap="14px">
              <InfoText>Dono: {groupOwner}</InfoText>
            </InfoWrapper>
            <InfoWrapper>
              <InfoText>qtd de membros:</InfoText>
              <AmountWrapper>{numberOfMbembers}</AmountWrapper>
            </InfoWrapper>
            <InfoWrapper gap="14px">
              <InfoText>qtd de tópicos:</InfoText>
              <AmountWrapper>{numberOfTopics}</AmountWrapper>
            </InfoWrapper>
          </GroupInfoArea>

          <GroupAvatar src={groupImage} />
        </CenterArea>
      </GroupCardHeader>

      <TopicList>{children}</TopicList>
      <ButtonArea>
        <CardButton onClick={onClickEnter} disabled={isPrivate}>
          {CardButtonTextEnter}
        </CardButton>
        <CardButton onClick={onClickView}>{CardButtonTextView}</CardButton>
      </ButtonArea>
    </Container>
  );
};

export default GroupCard;
