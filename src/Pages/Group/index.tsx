/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { type AxiosResponse } from "axios";
import { type Response } from "../../services/interfaces";
import LockIcon from "@mui/icons-material/Lock";
import PublicIcon from "@mui/icons-material/Public";
import Topic from "../../Components/TopicContent";
import CustomButton from "../../Components/Button";
import CustomInput from "../../Components/Input";
import CreateTopic from "../../Containers/CreateTopic";
import TopBar from "../../Components/TopBar";
import DialogBox from "../../Containers/DialogBox";
import GroupContainer from "../../Containers/GroupContainer";
import Loader from "../../Components/Loader";
import useAuth from "../../Hooks/useAuth";
import useGroup from "../../Hooks/useGroups";
import type { Group } from "../../Contexts/GroupContentContext/interfaces";
import CloseIcon from "../../Components/CloseIcon";
import useGroupContent from "../../Hooks/useGroupContent";
import { useRadioGroup } from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Dropzone from "../../Components/DropZone";
import defaultProfilePic from "../../assets/images/default-profile-pic.png";
import FormControlLabel, {
  type FormControlLabelProps,
} from "@mui/material/FormControlLabel";
import { styled } from "@mui/material/styles";

import {
  GroupImage,
  GroupTitle,
  Header,
  TopicList,
  Pagination,
  PaginationButton,
  PaginationItem,
  ButtonArea,
  ButtonAdminContainer,
  ButtonAdminWrapper,
  GroupInfo,
  NavBar,
  NavBarItem,
  UserCard,
  UserCardPic,
  GroupEditorContainer,
  CloseIconDiv,
  DataArea,
  EditProfileFieldWrapper,
  CardOptions,
  StyledRadioGroup,
  NavBarWrapper,
  GroupInfoContainer,
  StyledAdminIcon,
  StyledChatIcon,
  StyledGroupsList,
  StyledDescriptionIcon,
  StyledGavelIcon,
} from "./styles";

interface StyledFormControlLabelProps extends FormControlLabelProps {
  checked: boolean;
}

const StyledFormControlLabel = styled((props: StyledFormControlLabelProps) => (
  <FormControlLabel {...props} />
))(({ theme, checked }) => ({
  ".MuiFormControlLabel-label": checked && {
    color: theme.palette.primary.main,
  },
}));

const GroupPage = () => {
  const [group, setGroup] = useState<Group>();
  const [groupName, setGroupName] = useState<string>("");
  const [option, setOption] = useState<boolean>(false);
  const [editProfileVisible, setEditProfileVisible] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<File[]>([]);
  // const [groupMembers, setGroupMembers] = useState<Group>();
  const [createTopic, setCreateTopic] = useState<boolean>(false);
  const [groupId, setGroupId] = useState<string>("");
  const [isOwner, setIsOwner] = useState<object | null>(null);
  const [userId, SetUserId] = useState<string | null>();
  const [DialogIsVisible, SetDialogIsVisible] = useState<boolean>(false);
  const [contentName, setContentName] = useState<string>("topics");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [index] = useState(2);
  const [limit] = useState(5);
  const [pages, setPages] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState<number | undefined>(0);

  const params = useParams();
  const { groupData, asyncGetGroupMembers, asyncEditGroup, dispatch } =
    useGroup();
  // const { membersData, membersDispatch } = useGroupContent();
  const { userData } = useAuth();

  const { group_id } = params;

  const navigate = useNavigate();

  const openTopic = useCallback((topicId: number) => {
    navigate(`/topics/${Number(group_id)}/${topicId}`);
  }, []);

  const openTopicCreate = useCallback(() => {
    setCreateTopic(true);
  }, []);

  const toggleDialogBOx = useCallback((value: boolean) => {
    SetDialogIsVisible(value);
  }, []);

  const toggleEditGroupBox = useCallback((value: boolean) => {
    setEditProfileVisible(value);
  }, []);

  const closeTopicModal = useCallback(() => {
    setCreateTopic(false);
  }, []);

  useEffect(() => {
    SetUserId(userData.id);
  });

  const getGroup = async () => {
    if (!userData?.token) {
      return;
    }

    try {
      setIsLoading(true);
      const res: AxiosResponse<Response> = await api.get<
        Response,
        AxiosResponse<Response>
      >(
        `groups/${Number(group_id)}?page=${Number(currentPage)}&size=${Number(
          limit
        )}`,
        {
          headers: { Authorization: `Bearer ${userData?.token}` },
        }
      );

      const { group, numberOfTopics, isOwner } = res.data;

      // @ts-expect-error
      console.log("resposta grupo", res.data.groupData[0]);
      // @ts-expect-error
      setGroup({ ...res.data.groupData[0] });

      if (isOwner) {
        setIsOwner(isOwner);
      }

      // if (contentName === "members") {
      //   setLimit(2);
      // } else if (contentName === "topics") {
      //   setLimit(5);
      // }
      // @ts-expect-error
      const totalPages = Math.ceil(total / limit);
      const arrayPages = [];

      for (let i = 1; i <= totalPages; i++) {
        arrayPages.push(i);
      }

      setPages(arrayPages);

      setTotal(numberOfTopics);

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      return err;
    }
  };

  const fetchMembers = useCallback(async () => {
    try {
      setIsLoading(true);

      await asyncGetGroupMembers(Number(groupId), dispatch);

      // setGroupMembers((prevMembers) => [[...prevMembers], [...membersData]]);
      //  setGroupMembers([...membersData]);

      // setGroupMembers((prevMembers) => [
      //   ...(Array.isArray(prevMembers) ? prevMembers : []),
      //   //@ts-ignore
      //   ...membersData,
      // ]);

      // setIndex((prevIndex) => prevIndex + 1);

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  }, [index, isLoading]);

  useEffect(() => {
    void getGroup();

    generateContent();

    if (group_id) {
      setGroupId(group_id);
    }

    //    setGroupMembers([...membersData]);
    //  console.log("groupdata no grupo", membersData);
  }, [currentPage, limit, total, contentName, groupData]);

  const changeGroupname = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      event.preventDefault();
      setGroupName(event.currentTarget.value);
    },
    [groupName]
  );

  const editGroup = async () => {
    try {
      const data = new FormData();
      data.append("is_private", JSON.stringify(Boolean(option)));
      data.append("name", groupName);
      data.append("file", profileImage[0]);

      console.log("groupname:", groupName);

      await asyncEditGroup(groupId, data, dispatch);
      toggleEditGroupBox(false);
    } catch (err) {
      return err;
    }
  };

  const deleteGroup = async () => {
    if (!userData?.token) {
      return;
    }

    try {
      const res: AxiosResponse<Response> = await api.delete<
        Response,
        AxiosResponse<Response>
      >(`groups/${String(group_id)}`, {
        headers: { Authorization: `Bearer ${userData?.token}` },
      });

      SetDialogIsVisible(false);

      navigate(`/dashboard`);

      return res.status;
    } catch (err) {
      return err;
    }
  };

  function MyFormControlLabel(props: FormControlLabelProps) {
    const radioGroup = useRadioGroup();

    let checked = false;

    if (radioGroup) {
      checked = radioGroup.value === props.value;
    }

    return <StyledFormControlLabel checked={checked} {...props} />;
  }

  const currentUserIsMember = () => {
    const isMember = group?.members.find(({ id }) => id === Number(userId));

    if (isMember) {
      return (
        <ButtonArea>
          <CustomButton onClick={openTopicCreate} width="130px" height="40px">
            Criar tópico
          </CustomButton>
        </ButtonArea>
      );
    } else {
      return (
        <div
          style={{
            display: "none",
          }}
        />
      );
    }
  };

  const generateContent = () => {
    if (contentName === "topics") {
      return (
        <>
          {<div>tópicos</div> && group?.topics?.length !== 0}

          {group?.topics?.length !== 0 ? (
            <>
              <TopicList>
                {group?.topics?.slice(0, 6).map((topic, index) => {
                  return (
                    <Topic
                      URlGroup={true}
                      topicName={topic.name}
                      numberOfComments={topic.comments.length}
                      key={index}
                      onClick={() => {
                        openTopic(topic.id);
                      }}
                    />
                  );
                })}
              </TopicList>
              {currentUserIsMember()}

              <Pagination>
                <div>{total} tópicos criados</div>
                <PaginationButton>
                  {currentPage > 1 && (
                    <PaginationItem
                      onClick={() => {
                        setCurrentPage(currentPage - 1);
                      }}
                    >
                      Anterior
                    </PaginationItem>
                  )}
                  {pages.map((page) => (
                    <>
                      <PaginationItem
                        isSelect={page === currentPage}
                        key={page}
                        onClick={() => {
                          setCurrentPage(Number(page));
                        }}
                      >
                        {page}
                      </PaginationItem>
                    </>
                  ))}
                  {currentPage < pages.length && (
                    <PaginationItem
                      onClick={() => {
                        setCurrentPage(currentPage + 1);
                      }}
                    >
                      Próxima
                    </PaginationItem>
                  )}
                </PaginationButton>
              </Pagination>
            </>
          ) : (
            <>
              <div>Nenhum tópico criado ainda</div>
              <ButtonArea>
                <CustomButton
                  onClick={openTopicCreate}
                  width="130px"
                  height="40px"
                >
                  Criar
                </CustomButton>
              </ButtonArea>
            </>
          )}
        </>
      );
    }
    if (contentName === "members") {
      return (
        <>
          <div>members</div>

          <TopicList>
            {group?.members?.map((member, index) => {
              return (
                <UserCard key={index}>
                  <UserCardPic
                    src={
                      member.avatar?.path
                        ? member.avatar?.path
                        : defaultProfilePic
                    }
                  />
                  <strong>{member.name}</strong>
                </UserCard>
              );
            })}
          </TopicList>
        </>
      );
    }
    if (contentName === "admin") {
      return (
        <>
          <div>Administrador e moderadores</div>

          <div>Dono: {group?.administrator?.name} </div>
          <div>Id do dono {group?.administrator?.id}</div>

          {group?.moderators?.length !== 0 ? (
            <>
              <TopicList>
                {group?.moderators?.slice(0, 6).map((moderator, index) => {
                  return (
                    <UserCard key={index}>
                      <UserCardPic
                        src={
                          moderator.avatar?.path
                            ? moderator.avatar?.path
                            : defaultProfilePic
                        }
                      />
                      <strong>{moderator.name}</strong>
                    </UserCard>
                  );
                })}
              </TopicList>
              <ButtonArea>
                <CustomButton
                  onClick={openTopicCreate}
                  width="130px"
                  height="40px"
                >
                  Criar tópico
                </CustomButton>
              </ButtonArea>
            </>
          ) : (
            <div>Esse grupo ainda não possui admistradores</div>
          )}
        </>
      );
    } else {
      return (
        <>
          <div>info</div>
        </>
      );
    }
  };

  return (
    <>
      <TopBar />
      {editProfileVisible && (
        <GroupEditorContainer>
          <CloseIconDiv>
            <CloseIcon
              onClick={() => {
                toggleEditGroupBox(false);
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
          <DataArea>
            <EditProfileFieldWrapper>
              <CustomInput
                type="text"
                value={groupName}
                placeHolder="Alterar Nome"
                onChange={changeGroupname}
              />
            </EditProfileFieldWrapper>
          </DataArea>
          <CardOptions>
            <StyledRadioGroup
              radioActive={true}
              name="use-radio-group"
              defaultValue="first"
            >
              <div className="radio-options">
                <PublicIcon />
                <MyFormControlLabel
                  value="first"
                  label="público"
                  control={
                    <Radio
                      onClick={() => {
                        setOption(false);
                      }}
                    />
                  }
                />
                <span className="option-description">
                  (Qualquer pessoa poderá visualizar o conteúdo do grupo)
                </span>
              </div>
              <div className="radio-options">
                <LockIcon />
                <MyFormControlLabel
                  value="second"
                  label="privado"
                  control={
                    <Radio
                      onClick={() => {
                        setOption(true);
                      }}
                    />
                  }
                />

                <span className="option-description">
                  (Somente membros poderão ver o conteúdo do grupo)
                </span>
              </div>
            </StyledRadioGroup>
          </CardOptions>
          <CustomButton
            onClick={() => {
              void editGroup();
            }}
          >
            Alterar dados
          </CustomButton>
        </GroupEditorContainer>
      )}
      <GroupContainer>
        {<Loader /> && isLoading}
        <ButtonAdminContainer>
          <NavBarWrapper>
            <NavBar>
              <NavBarItem>
                <StyledChatIcon />
                <h6
                  onClick={() => {
                    setContentName("topics");
                  }}
                >
                  Discussão
                </h6>
              </NavBarItem>
              <NavBarItem>
                <StyledGroupsList />
                <h6
                  onClick={() => {
                    setContentName("members");
                  }}
                >
                  Membros
                </h6>
              </NavBarItem>
              <NavBarItem>
                <StyledAdminIcon />
                <h6
                  onClick={() => {
                    setContentName("admin");
                  }}
                >
                  Administradores
                </h6>
              </NavBarItem>

              <NavBarItem>
                <StyledDescriptionIcon />
                <h6
                  onClick={() => {
                    setContentName("info");
                  }}
                >
                  Descrição
                </h6>
              </NavBarItem>
              <NavBarItem>
                <StyledGavelIcon />
                <h6
                  onClick={() => {
                    setContentName("regras");
                  }}
                >
                  Regras
                </h6>
              </NavBarItem>
            </NavBar>
          </NavBarWrapper>

          {isOwner && (
            <ButtonAdminWrapper>
              <CustomButton
                width="90px"
                height="30px"
                customColor="red"
                customBackgroundColor=" #090a0d"
                onClick={() => {
                  toggleDialogBOx(true);
                }}
              >
                Deletar
              </CustomButton>
              <CustomButton
                width="90px"
                height="30px"
                customColor="green"
                customBackgroundColor=" #090a0d"
                onClick={() => {
                  toggleEditGroupBox(true);
                }}
              >
                Editar
              </CustomButton>
            </ButtonAdminWrapper>
          )}
        </ButtonAdminContainer>
        <GroupInfoContainer>
          <img
            src={group?.avatar?.path ? group?.avatar.path : "alt"}
            style={{
              width: "200px",

              height: "200px",
              borderRadius: "8%",
            }}
          />
          <Header>
            <GroupTitle>{group?.name}</GroupTitle>
            <GroupInfo>
              <PublicIcon
                style={{
                  color: "#565f82",
                }}
              />
              <GroupTitle> grupo público</GroupTitle>
              <div />
              <GroupTitle>{group?.members?.length} membros</GroupTitle>
            </GroupInfo>

            <GroupImage />
          </Header>
        </GroupInfoContainer>

        {generateContent()}

        {createTopic && (
          <CreateTopic groupId={groupId} onClick={closeTopicModal} />
        )}
        {DialogIsVisible && (
          <DialogBox
            visible={DialogIsVisible}
            onCancel={() => {
              toggleDialogBOx(false);
            }}
            onConfirm={() => {
              void deleteGroup();
            }}
          />
        )}
      </GroupContainer>
    </>
  );
};

export default GroupPage;
