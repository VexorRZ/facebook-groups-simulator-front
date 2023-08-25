import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  margin-top: 40px;
  width: 800px;
  height: 100%;
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

export const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  gap: 2px;
  flex: 6;
`;

export const Comment = styled.div`
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

export const GroupImage = styled.img``;

export const GroupTitle = styled.h3``;

export const CommentContent = styled.div`
  border: solid 1px gray;
  border-radius: 4px;
  width: 540px;
  height: 100px;
  padding: 10px;
`;

export const ButtonArea = styled.div`
  margin-top: 5px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

export const CommentsLists = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const CommentAuthor = styled.strong`
  text-decoration: underline;
  font-weight: bold;
  font-family: sans-serif;
`;

export const AuthorAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: solid 1px gray;
`;

export const UserInfoArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const CommentBox = styled.input`
  width: 540px;
  height: 100px;
  padding: 10px;
  background-color: transparent;
  border-width: 1px;
  border-style: solid;
  border-radius: 20px;
  background-color: ghostwhite;
`;

export const TopicAuthor = styled.h6``;
