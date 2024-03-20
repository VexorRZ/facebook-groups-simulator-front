import styled from "styled-components";

interface IPaginationProps {
  isSelect?: boolean;
}

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
