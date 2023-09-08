import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  margin-top: 40px;
  width: 800px;
  height: 500px;
  flex: 10;
  border-radius: 6px;
  box-shadow: 0vh;
  background-color: #3e4d60;
  border: 1px solid #526173;
  padding: 10px;
  box-shadow: 18px 19px 32px -11px rgba(0, 0, 0, 1);
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex: 2;
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

export const PaginationItem = styled.div`
  margin: 0 10px;
  &:hover {
    cursor: pointer;
  }
`;

export const GroupImage = styled.img``;

export const GroupTitle = styled.h3``;

export const Topic = styled.div``;

export const TopicTitle = styled.h5``;

export const TopicAuthor = styled.h6``;
