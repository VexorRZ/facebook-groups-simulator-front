import React, { useEffect, useState } from "react";
import TopBar from "../../Components/TopBar";
import useUsers from "../../Hooks/useUsers";
import useAuth from "../../Hooks/useAuth";
import defaultProfilePic from "../../assets/images/default-profile-pic.png";
import CustomButton from "../../Components/Button";

import { type Users } from "../../Contexts/UsersContext/interfaces";

import {
  GroupCardList,
  Container,
  UserCardAvatar,
  UserCardContainer,
  UserCardName,
  UserdataArea,
} from "./styles";

const UsersPage = () => {
  const [loadedUsers, setUsers] = useState<Users[]>([]);

  const { usersData, asyncLoadUsers, dispatch } = useUsers();
  const { userData } = useAuth();

  useEffect(() => {
    asyncLoadUsers(dispatch, userData.token);

    //@ts-ignore
    setUsers(usersData);

    console.log("users in page users", usersData);
  }, []);

  return (
    <Container>
      <TopBar />

      <GroupCardList>
        {loadedUsers.map((user, index) => {
          return (
            <>
              <UserCardContainer key={index}>
                <UserdataArea>
                  <UserCardAvatar
                    src={
                      user.avatar?.path ? user.avatar?.path : defaultProfilePic
                    }
                    alt=""
                  />
                  <UserCardName>{user.name}</UserCardName>
                </UserdataArea>
                <CustomButton width="120px">Ver perfil</CustomButton>
              </UserCardContainer>
            </>
          );
        })}
      </GroupCardList>
    </Container>
  );
};

export default UsersPage;
