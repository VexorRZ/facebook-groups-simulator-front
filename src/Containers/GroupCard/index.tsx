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
  NavBar,
  NavBarItem,
  GroupInfo,
  NavBarItemLabel,
  GroupDescription,
  ContentWrapper,
  NavBarItemNumber,
  StyleAdminIcon,
  StyledGroupsIcon,
  StyledChatIcon,
  StyledPublicIcon,
} from "./styles";

interface IGrupoCardProps {
  onClickView?: () => void;
  onClickEnter: () => void;
  groupName?: string;
  numberOfMbembers?: number;
  children?: React.ReactNode;
  numberOfTopics?: number;
  groupImage?: string;
  isPrivate?: boolean;
  dialogIsVisible?: boolean;
  groupOwner?: string;
  groupStatus?: string;
  statusColor?: string;
  CardButtonTextEnter?: string;
  cardButtonTextEnterVisible?: boolean;
  ButtonViewGroupVisible?: boolean;
  CardButtonTextView?: string;
  marginLeft?: string;
  description?: string;
}

const OldGroupCard = ({
  children,
  groupName,
  numberOfMbembers,
  numberOfTopics,
  CardButtonTextEnter,
  cardButtonTextEnterVisible,
  ButtonViewGroupVisible,
  CardButtonTextView,
  groupImage,
  isPrivate,
  groupOwner,
  groupStatus,
  statusColor,
  marginLeft,

  onClickView,
  onClickEnter,
}: IGrupoCardProps) => {
  return (
    <Container marginLeft={marginLeft}>
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
            <InfoWrapper gap="21px">
              <InfoText>Dono: {groupOwner}</InfoText>
            </InfoWrapper>
            <InfoWrapper gap="12px">
              <InfoText>Membros:</InfoText>
              <AmountWrapper>{numberOfMbembers}</AmountWrapper>
            </InfoWrapper>
            <InfoWrapper gap="21px">
              <InfoText>Tópicos:</InfoText>
              <AmountWrapper>{numberOfTopics}</AmountWrapper>
            </InfoWrapper>
          </GroupInfoArea>

          <GroupAvatar src={groupImage} />
        </CenterArea>
      </GroupCardHeader>

      <TopicList>{children}</TopicList>
      <ButtonArea>
        <CardButton
          onClick={onClickEnter}
          disabled={isPrivate}
          visible={cardButtonTextEnterVisible}
        >
          {CardButtonTextEnter}
        </CardButton>
        <CardButton onClick={onClickView} visible={ButtonViewGroupVisible}>
          {CardButtonTextView}
        </CardButton>
      </ButtonArea>
    </Container>
  );
};

const NewGroupCard = ({
  children,
  groupName,
  numberOfMbembers,
  numberOfTopics,
  CardButtonTextEnter,
  cardButtonTextEnterVisible,
  ButtonViewGroupVisible,
  CardButtonTextView,
  groupImage,
  isPrivate,
  groupOwner,
  groupStatus,
  statusColor,
  marginLeft,
  description,
  onClickView,
  onClickEnter,
}: IGrupoCardProps) => {
  return (
    <Container marginLeft={marginLeft}>
      <GroupAvatar src={groupImage} />

      <ContentWrapper>
        <NavBar>
          <NavBarItem>
            <StyleAdminIcon />
            <NavBarItemLabel>
              Dono: <p>{groupOwner}</p>
            </NavBarItemLabel>
          </NavBarItem>
          <NavBarItem>
            <StyledGroupsIcon />
            <NavBarItemLabel>Membros</NavBarItemLabel>
            <NavBarItemNumber>
              <p>{numberOfMbembers}</p>
            </NavBarItemNumber>
          </NavBarItem>
          <NavBarItem>
            <StyledChatIcon />
            <NavBarItemLabel>Tópicos</NavBarItemLabel>
            <NavBarItemNumber>
              <p>{numberOfTopics}</p>
            </NavBarItemNumber>
          </NavBarItem>
          <NavBarItem>
            <NavBarItemLabel>Grupo</NavBarItemLabel>
            <NavBarItemLabel statusColor={statusColor}>
              {groupStatus}
            </NavBarItemLabel>
          </NavBarItem>
        </NavBar>
        <GroupInfo>
          <GroupTitle>{groupName}</GroupTitle>
          <GroupDescription>{description}</GroupDescription>
        </GroupInfo>
        <ButtonArea>
          <CardButton
            onClick={onClickEnter}
            disabled={isPrivate}
            visible={cardButtonTextEnterVisible}
          >
            {CardButtonTextEnter}
          </CardButton>
          <CardButton onClick={onClickView} visible={ButtonViewGroupVisible}>
            {CardButtonTextView}
          </CardButton>
        </ButtonArea>
      </ContentWrapper>
    </Container>
  );
};

export default NewGroupCard;
