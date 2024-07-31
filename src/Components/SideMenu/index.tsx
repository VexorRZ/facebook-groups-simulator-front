import React from "react";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { useNavigate } from "react-router-dom";

import { Container, ElementArea } from "./styles";

interface ISideMenuProps {
  position?: string;
}

const SideMenu: React.FC = ({ position }: ISideMenuProps) => {
  const navigate = useNavigate();

  const openProfilePage = () => {
    navigate("/profile");
  };

  const openUserGroups = () => {
    navigate("/user-groups");
  };

  const openGroupCreatePage = () => {
    navigate("/create-group");
  };

  const openUsersList = () => {
    navigate("/users");
  };

  return (
    <Container position={position}>
      <ElementArea onClick={openProfilePage}>
        <AccountCircleIcon
          style={{
            color: "#565f82",
          }}
        />
        <h6>Perfil </h6>
      </ElementArea>
      <ElementArea onClick={openUsersList}>
        <PersonIcon
          style={{
            color: "#565f82",
          }}
        />
        <h6>usuários </h6>
      </ElementArea>
      <ElementArea onClick={openUserGroups}>
        <GroupsIcon
          style={{
            color: "#565f82",
          }}
        />
        <h6> Meus grupos </h6>
      </ElementArea>
      <ElementArea onClick={openGroupCreatePage}>
        <GroupAddIcon
          style={{
            color: "#565f82",
          }}
        />
        <h6>criar grupo</h6>
      </ElementArea>
    </Container>
  );
};

export default SideMenu;
