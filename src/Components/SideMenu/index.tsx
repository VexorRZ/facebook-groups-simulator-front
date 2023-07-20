import React from "react";
import { Notifications } from "@material-ui/icons";
import GroupIcon from "@mui/icons-material/Group";

import { Container, ElementArea } from "./styles";

const SideMenu: React.FC = () => {
  return (
    <Container>
      <ElementArea>
        <GroupIcon />
        <h6>item </h6>
      </ElementArea>
      <ElementArea>
        <Notifications />
        <h6>item </h6>
      </ElementArea>
      <ElementArea>
        <Notifications />
        <h6>item </h6>
      </ElementArea>
      <ElementArea>
        <Notifications />
        <h6>item </h6>
      </ElementArea>
      <ElementArea>
        <Notifications />
        <h6>item </h6>
      </ElementArea>
      <ElementArea>
        <Notifications />
        <h6>item </h6>
      </ElementArea>
    </Container>
  );
};

export default SideMenu;
