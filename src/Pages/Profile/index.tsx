import React, { useState, useCallback } from "react";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import GroupIcon from "@mui/icons-material/Group";
import TopicIcon from "@mui/icons-material/Topic";
import CommentsDisabledIcon from "@mui/icons-material/CommentsDisabled";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupsIcon from "@mui/icons-material/Groups";
import CustomButton from "../../Components/Button";
import useAuth from "../../Hooks/useAuth";
import Dropzone from "../../Components/DropZone";
import CustomInput from "../../Components/Input";

import {
  Container,
  ProfileText,
  UserAvatar,
  Title,
  ProfiletextWrapper,
  ProfileStatisticsColumn,
  StatisticProfileItem,
  StatisticsItemWrapper,
  ProfileStatisticsWrapper,
  ButtonWrapper,
  ProfileEditorContainer,
  EditProfileFieldWrapper,
  CloseIcon,
  CloseIconDiv,
  DataArea,
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
  const [editProfileVisible, setEditProfileVisible] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<File[]>([]);
  const [newUserName, setNewUserName] = useState<string>("");
  const [newUserMail, setNewUserMail] = useState<string>("");
  const { avatar } = useAuth();

  const changeUserName = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      event.preventDefault();
      setNewUserName(event.currentTarget.value);
    },
    [newUserName]
  );

  const changeUserMail = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      event.preventDefault();
      setNewUserMail(event.currentTarget.value);
    },
    [newUserName]
  );

  const toggleProfileEdit = useCallback((value: boolean) => {
    setEditProfileVisible(value);
  }, []);

  return (
    <>
      {editProfileVisible && (
        <>
          <ProfileEditorContainer>
            <CloseIconDiv>
              <CloseIcon
                onClick={() => {
                  toggleProfileEdit(false);
                }}
              />
            </CloseIconDiv>
            <DataArea>
              <Dropzone
                previewMessage="Selecione a foto do seu grupo..."
                files={profileImage}
                onDrop={(acceptedImage) => {
                  setProfileImage(
                    acceptedImage.map((file) =>
                      Object.assign(file, {
                        preview: URL.createObjectURL(file),
                      })
                    )
                  );
                }}
              />
              <EditProfileFieldWrapper>
                <CustomInput
                  type="text"
                  value={newUserName}
                  placeHolder="digite seu novo nome"
                  onChange={changeUserName}
                />
              </EditProfileFieldWrapper>
              <EditProfileFieldWrapper>
                <CustomInput
                  type="text"
                  value={newUserMail}
                  placeHolder="digite seu novo email"
                  onChange={changeUserMail}
                />
              </EditProfileFieldWrapper>
            </DataArea>
          </ProfileEditorContainer>
        </>
      )}
      <Container editProfileVisible={editProfileVisible}>
        <UserAvatar src={avatar as string} />
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

        <ProfileStatisticsWrapper>
          <ProfileStatisticsColumn>
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
          </ProfileStatisticsColumn>

          <ProfileStatisticsColumn>
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
                Qtd de grpos que você está aguardando ser aceito:{" "}
                {JoinsRequested}
              </StatisticProfileItem>
            </StatisticsItemWrapper>
          </ProfileStatisticsColumn>
        </ProfileStatisticsWrapper>
        <ButtonWrapper>
          <CustomButton
            disabled={editProfileVisible}
            marginTop="70px"
            width="80px"
            onClick={() => {
              toggleProfileEdit(true);
            }}
          >
            Editar
          </CustomButton>
        </ButtonWrapper>
      </Container>
    </>
  );
};

export default Profile;
