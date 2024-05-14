import React, { useEffect, useState } from "react";
import GroupCard from "../../Containers/GroupCard";
import TopBar from "../../Components/TopBar";
import useUsers from "../../Hooks/useUsers";
import useAuth from "../../Hooks/useAuth";

import { type Users } from "../../Contexts/UsersContext/interfaces";

import {
  GroupCardList,
  Container,
  UserCardAvatar,
  UserCardContainer,
  UserCardName,
} from "./styles";

const UsersPage = () => {
  const [loadedUsers, setUsers] = useState<Users[]>([]);

  const { usersData, asyncLoadUsers, dispatch } = useUsers();
  const { userData } = useAuth();

  useEffect(() => {
    asyncLoadUsers(userData.token, dispatch);

    console.log("users in page users", userData);
    //@ts-ignore
    setUsers(usersData);
  }, []);

  return (
    <Container>
      <TopBar />

      <GroupCardList>
        {loadedUsers.map((user, index) => {
          return (
            <>
              <UserCardContainer>
                <UserCardAvatar src={user.avatar.path} alt="" />
                <UserCardName>{user.name}</UserCardName>
              </UserCardContainer>
            </>
          );
        })}
      </GroupCardList>
    </Container>
  );
};

export default UsersPage;
