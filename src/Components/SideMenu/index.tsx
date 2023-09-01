import React from "react";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";

import { Container, ElementArea } from "./styles";

const SideMenu: React.FC = () => {
  return (
    <Container>
      <ElementArea>
        <AccountCircleIcon />
        <h6>Perfil </h6>
      </ElementArea>
      <ElementArea>
        <PersonIcon />
        <h6>usuários </h6>
      </ElementArea>
      <ElementArea>
        <GroupsIcon />
        <h6>grupos </h6>
      </ElementArea>
    </Container>
  );
};

export default SideMenu;
