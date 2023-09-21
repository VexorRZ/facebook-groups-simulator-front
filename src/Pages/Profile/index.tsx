import React from "react";
import avatar from "../../assets/images/fibonacci.jpg";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import GroupIcon from "@mui/icons-material/Group";
import TopicIcon from "@mui/icons-material/Topic";
import CommentsDisabledIcon from "@mui/icons-material/CommentsDisabled";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupsIcon from "@mui/icons-material/Groups";

import {
  Container,
  ProfileText,
  UserAvatar,
  Title,
  ProfiletextWrapper,
  ProfileStatistics,
  StatisticProfileItem,
  StatisticsItemWrapper,
} from "./styles";
interface IProfileProps {
  userName?: string;
  userEmail?: string;
  userBirthDate?: Date;
  totalNumberOfGroups?: number;
  groupsAsOwner?: number;
  groupsAsModerator?: number;
  groupsAsMember?: number;
  topicsCreated?: number;
  commentsCreated?: number;
  GroupsBanned?: number;
  JoinsRequested?: number;
}

const Profile = ({
  userName,
  userEmail,
  userBirthDate,
  totalNumberOfGroups,
  groupsAsOwner,
  groupsAsModerator,
  groupsAsMember,
  topicsCreated,
  commentsCreated,
  GroupsBanned,
  JoinsRequested,
}: IProfileProps) => {
  return (
    <Container>
      <UserAvatar src={avatar} />
      <Title>Informações do perfil </Title>
      <ProfiletextWrapper>
        <ProfileText>Nome do usuário {userName}</ProfileText>
      </ProfiletextWrapper>
      <ProfiletextWrapper>
        <ProfileText>Email {userEmail}</ProfileText>
      </ProfiletextWrapper>
      <ProfiletextWrapper>
        <ProfileText>
          Data de Nascimento {userBirthDate?.toISOString()}
        </ProfileText>
      </ProfiletextWrapper>

      <ProfileStatistics>
        <StatisticsItemWrapper>
          <GroupsIcon
            style={{
              color: "#ebeff5",
            }}
          />

          <hr />

          <StatisticProfileItem>
            Total de grupos: {totalNumberOfGroups}
          </StatisticProfileItem>
        </StatisticsItemWrapper>

        <StatisticsItemWrapper>
          <AdminPanelSettingsIcon
            style={{
              color: "#ebeff5",
            }}
          />
          <hr />
          <StatisticProfileItem>
            Qtd que você é dono: {groupsAsOwner}
          </StatisticProfileItem>
        </StatisticsItemWrapper>

        <StatisticsItemWrapper>
          <AdminPanelSettingsIcon
            style={{
              color: "#ebeff5",
            }}
          />
          <hr />
          <StatisticProfileItem>
            Qtd de grupos que você é moderador: {groupsAsModerator}
          </StatisticProfileItem>
        </StatisticsItemWrapper>

        <StatisticsItemWrapper>
          <GroupIcon
            style={{
              color: "#ebeff5",
            }}
          />
          <hr />
          <StatisticProfileItem>
            Qtd de grupos que você é membro: {groupsAsMember}
          </StatisticProfileItem>
        </StatisticsItemWrapper>

        <StatisticsItemWrapper>
          <TopicIcon
            style={{
              color: "#ebeff5",
            }}
          />
          <hr />
          <StatisticProfileItem>
            Qtd de tópicos que você é o autor: {topicsCreated}
          </StatisticProfileItem>
        </StatisticsItemWrapper>

        <StatisticsItemWrapper>
          <CommentsDisabledIcon
            style={{
              color: "#ebeff5",
            }}
          />
          <hr />
          <StatisticProfileItem>
            Qtd de comentários que você é o autor: {commentsCreated}
          </StatisticProfileItem>
        </StatisticsItemWrapper>

        <StatisticsItemWrapper>
          <NotInterestedIcon
            style={{
              color: "#ebeff5",
            }}
          />
          <hr />
          <StatisticProfileItem>
            Qtd de grupos que você está banido: {GroupsBanned}
          </StatisticProfileItem>
        </StatisticsItemWrapper>

        <StatisticsItemWrapper>
          <GroupAddIcon
            style={{
              color: "#ebeff5",
            }}
          />
          <hr />
          <StatisticProfileItem>
            Qtd de grpos que você está aguardando ser aceito: {JoinsRequested}
          </StatisticProfileItem>
        </StatisticsItemWrapper>
      </ProfileStatistics>
    </Container>
  );
};

export default Profile;
