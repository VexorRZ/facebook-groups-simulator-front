import styled from "styled-components";

export const Comment = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  .author {
    font-size: 16px;
    color: black;
  }
  .body {
    width: 80%;
    height: 100%;
    font-size: 12px;
  }
`;

export const AuthorAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: solid 1px gray;
`;

export const CommentAuthor = styled.strong`
  text-decoration: underline;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
  color: #29a329;
`;

export const CommentDate = styled.time`
  color: #d9d9d9;
`;

export const CommentContent = styled.div`
  border: solid 1px #526173;
  border-radius: 4px;
  width: 540px;
  min-height: 100px;
  height: 100%;
  padding: 10px;
  font-family: Arial, Helvetica, sans-serif;
  color: #d9d9d9;
`;

export const CommentDetailsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-top: 2px;
  float: right;

  .likeWrapper {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #d9d9d9;
  }
`;
