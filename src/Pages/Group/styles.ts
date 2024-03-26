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
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
`;

export const NavBarItem = styled.li`
  float: left;
  strong {
    font-weight: bold;
  }
  &:hover {
    cursor: pointer;
  }
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
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

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
  justify-content: space-between;
  width: 100%;
  img {
    width: 90px;
    height: 90px;
    border-radius: 50%;
  }
`;

export const ButtonAdminWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1px;
`;

export const UserCard = styled.div`
  display: flex;
  flex-direction: row;
  width: 313px;
  height: 54px;
  background-color: #373e4a;
  border-radius: 4px;
  padding: 4px;
  gap: 10px;

  strong {
    font-size: 14px;
  }
`;

export const UserCardPic = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid;
  padding: 1px;
`;

export const GroupImage = styled.img``;

export const GroupTitle = styled.h3``;

export const TopicTitle = styled.h5``;

export const TopicAuthor = styled.h6``;
