import React from "react";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { useNavigate } from "react-router-dom";

import { Container, ElementArea } from "./styles";

const SideMenu: React.FC = () => {
  const navigate = useNavigate();

  const openProfilePage = () => {
    navigate("/profile");
  };

  const openGroupCreatePage = () => {
    navigate("/create-group");
  };

  return (
    <Container>
      <ElementArea onClick={openProfilePage}>
        <AccountCircleIcon
          style={{
            color: "#ebeff5",
          }}
        />
        <h6>Perfil </h6>
      </ElementArea>
      <ElementArea>
        <PersonIcon
          style={{
            color: "#ebeff5",
          }}
        />
        <h6>usuários </h6>
      </ElementArea>
      <ElementArea>
        <GroupsIcon
          style={{
            color: "#ebeff5",
          }}
        />
        <h6>grupos </h6>
      </ElementArea>
      <ElementArea onClick={openGroupCreatePage}>
        <GroupAddIcon
          style={{
            color: "#ebeff5",
          }}
        />
        <h6>criar grupo</h6>
      </ElementArea>
    </Container>
  );
};

export default SideMenu;
