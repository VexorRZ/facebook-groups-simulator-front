import styled from "styled-components";
import { Link } from "react-router-dom";
export const NavBar = styled.ul`
  border-radius: 6px;
  width: 60%;
  z-index: 99;
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
`;

export const NavBarItem = styled.li`
  float: left;
`;

export const StyledLink = styled(Link)`
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  :hover {
    background-color: #111;
  }
`;
