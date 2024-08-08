/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useState, useCallback, useEffect } from "react";
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
import CameraswitchIcon from "@mui/icons-material/Cameraswitch";
import TopBar from "../../Components/TopBar";
import defaultProfilePic from "../../assets/images/default-profile-pic.png";
import { ToastError } from "../../Components/ToastContainer/ToastMessages";
import DialogBox from "../../Containers/DialogBox";
import { useNavigate } from "react-router-dom";

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
  const [editAvatarVisible, setEditAvatarVisible] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<File[]>([]);
  const [newUserName, setNewUserName] = useState<string>("");
  const [newUserMail, setNewUserMail] = useState<string>("");
  const [DialogIsVisible, SetDialogIsVisible] = useState<boolean>(false);

  const navigate = useNavigate();

  const { userData, dispatch, asyncChangeAvatar, asyncRequestDeleteAccount } =
    useAuth();

  useEffect(() => {}, [editAvatarVisible, userData]);

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

  const toggleDialogBOx = useCallback((value: boolean) => {
    SetDialogIsVisible(value);
  }, []);

  const deleteAccount = async () => {
    try {
      if (userData?.token) {
        await asyncRequestDeleteAccount(Number(userData?.id), userData?.token);
      }
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      return err;
    }
  };

  const updateAvatar = async (event: any) => {
    event.preventDefault();

    if (!userData?.token) {
      ToastError("Sua sessão foi expirada, faça login novamente");
      return;
    }

    const data = new FormData();

    data.append("file", profileImage[0]);

    try {
      void asyncChangeAvatar(dispatch, data);

      setEditAvatarVisible(!editAvatarVisible);
    } catch (err) {
      setEditAvatarVisible(!editAvatarVisible);
    }
  };

  const generateProfilePic = useCallback(() => {
    if (userData.avatar !== null || userData.avatar || "") {
      return userData.avatar.path;
    } else {
      return defaultProfilePic;
    }
  }, [userData]);

  return (
    <>
      <TopBar />
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
            <CustomButton
              onClick={() => {
                toggleDialogBOx(true);
              }}
            >
              Deletar perfil?
            </CustomButton>
          </ProfileEditorContainer>
        </>
      )}
      {editAvatarVisible && (
        <ProfileEditorContainer height="330px" width="340px">
          <CloseIconDiv>
            <CloseIcon
              onClick={() => {
                setEditAvatarVisible(false);
              }}
            />
          </CloseIconDiv>
          <Dropzone
            previewMessage="Selecione a sua nova foto de perfil.."
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

          <CustomButton height="118px" width="121px" onClick={updateAvatar}>
            Alterar
          </CustomButton>
        </ProfileEditorContainer>
      )}

      <Container bluried={editProfileVisible || editAvatarVisible}>
        <UserAvatar
          style={{
            background: `url(${generateProfilePic()} ) no-repeat center`,
            backgroundSize: "cover",
          }}
        >
          <div
            className="userAvatarHover"
            onClick={() => {
              setEditAvatarVisible(!editAvatarVisible);
            }}
          >
            <CameraswitchIcon
              style={{
                width: 25,
                height: 25,
                marginTop: 10,
              }}
            />

            <strong>alterar foto</strong>
          </div>
        </UserAvatar>

        <Title>Informações do perfil </Title>
        <ProfiletextWrapper>
          <ProfileText>Nome do usuário: {userData?.name}</ProfileText>
        </ProfiletextWrapper>
        <ProfiletextWrapper>
          <ProfileText>Email: {userData?.email}</ProfileText>
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
                Qtd de grpos que você está aguardando ser aceito:
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
      {DialogIsVisible && (
        <DialogBox
          visible={DialogIsVisible}
          onCancel={() => {
            toggleDialogBOx(false);
          }}
          onConfirm={() => {
            void deleteAccount();
          }}
        />
      )}
    </>
  );
};

export default Profile;
