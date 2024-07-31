import React, { useEffect, useState, useCallback } from "react";
import TopBar from "../../Components/TopBar";
import useUsers from "../../Hooks/useUsers";
import useAuth from "../../Hooks/useAuth";
import defaultProfilePic from "../../assets/images/default-profile-pic.png";
import CustomButton from "../../Components/Button";
import useDebounce from "../../utils/Debounce";

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
  const [query, setQuery] = useState("");
  const { userData } = useAuth();

  useEffect(() => {
    if (!query) {
      return;
    }

    asyncLoadUsers(dispatch, userData.token, query);

    //@ts-ignore
    setUsers([...usersData]);

    console.log("users in page users", usersData);
  }, [query]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setQuery(value);
  };
  const debouncedQuery = useDebounce(query, 1000);

  const { usersData, asyncLoadUsers, dispatch } = useUsers();

  return (
    <Container>
      <TopBar onChange={handleChange} />

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
