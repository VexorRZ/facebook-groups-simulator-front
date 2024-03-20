import styled from "styled-components";

import { Link } from "react-router-dom";

interface IPaginationProps {
  isSelect?: boolean;
}

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

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 2;
  width: 100%;
`;

export const GroupInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 6px;
  div {
    width: 2px;
    height: 16px;
    background-color: black;
  }
`;

export const TopicList = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  gap: 2px;
  flex: 6;
`;

export const Pagination = styled.div`
  display: flex;
  min-width: 500px;
  justify-content: space-between;
  margin-top: 20px;
`;

export const PaginationButton = styled.div`
  display: flex;
  &:hover {
    cursor: pointer;
  }
`;

export const PaginationItem = styled.div<IPaginationProps>`
  margin: 0 10px;

  ${(props) =>
    props.isSelect && {
      background: "#6d6d6d",
    }}

  &:hover {
    cursor: pointer;
  }
`;

export const ButtonArea = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ButtonAdminContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

export const ButtonAdminWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1px;
`;

export const GroupImage = styled.img``;

export const GroupTitle = styled.h3``;

export const Topic = styled.div``;

export const TopicTitle = styled.h5``;

export const TopicAuthor = styled.h6``;
