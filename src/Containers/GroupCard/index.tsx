import React from "react";
import DialogBox from "../../Containers/DialogBox";

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
  StatusText,
  TitleAndStatus,
  CenterArea,
  StatusWrapper,
} from "./styles";

interface IGrupoCardProps {
  onClick?: () => void;
  onCancel?: () => void;
  onConfirm?: () => void;
  groupName: string;
  numberOfMbembers: number;
  children?: React.ReactNode;
  numberOfTopics: number;
  joiningButtonText: string;
  groupImage?: string;
  isPrivate?: boolean;
  dialogIsVisible?: boolean;
  groupOwner: string;
  groupStatus: string;
  statusColor: string;
}

const GroupCard = ({
  children,
  groupName,
  numberOfMbembers,
  numberOfTopics,
  joiningButtonText,
  groupImage,
  isPrivate,
  dialogIsVisible,
  groupOwner,
  groupStatus,
  statusColor,
  onClick,
  onCancel,
  onConfirm,
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
        <JoiningButton onClick={onClick} disabled={isPrivate}>
          Ver Grupo
        </JoiningButton>
        <JoiningButton onClick={onClick}>{joiningButtonText}</JoiningButton>
      </ButtonArea>
      {dialogIsVisible && (
        <DialogBox
          visible={dialogIsVisible}
          onCancel={() => {
            if (onCancel) {
              onCancel();
            }
          }}
          onConfirm={() => {
            if (onConfirm) {
              onConfirm();
            }
          }}
        />
      )}
    </Container>
  );
};

export default GroupCard;
