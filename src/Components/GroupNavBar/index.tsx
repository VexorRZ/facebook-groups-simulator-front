import React from "react";

import { NavBar, NavBarItem, StyledLink } from "./styles";

interface IGroupNavBarProps {
  groupId: number;
}

const GroupNavBar = ({ groupId }: IGroupNavBarProps) => {
  return (
    <>
      <NavBar>
        <NavBarItem>
          <StyledLink to="/">Discussão</StyledLink>
        </NavBarItem>
        <NavBarItem>
          <StyledLink to={`/group/${groupId}/members`}>Membros</StyledLink>
        </NavBarItem>
        <NavBarItem>
          <StyledLink to="/">Administradores</StyledLink>
        </NavBarItem>
        <NavBarItem>
          <StyledLink to="/">Descrição</StyledLink>
        </NavBarItem>
      </NavBar>
    </>
  );
};
export default GroupNavBar;
