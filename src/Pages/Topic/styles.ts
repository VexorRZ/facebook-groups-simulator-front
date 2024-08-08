import styled from "styled-components";

interface IPaginationProps {
  isSelect?: boolean;
}

interface ICommentProps {
  socket: any;
  user: any;
}

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
  padding: 10px;
  background-color: #0e1014;
  box-shadow: 18px 8px 12px 0px rgba(8, 9, 16, 4);
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
  font-family: Arial, Helvetica, sans-serif;
  h2 {
    color: #d9d9d9;
    font-family: Georgia, "Times New Roman", Times, serif;
  }

  .authorWrapper {
    display: flex;
    align-items: center;
    gap: 3px;

    h3 {
      color: #d9d9d9;
    }
    h4 {
      color: #29a329;
    }
  }
`;

export const Comment = styled.div<ICommentProps>`
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

export const GroupImage = styled.img``;

export const GroupTitle = styled.h2`
  color: #d9d9d9;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 500;
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
  font-family: Arial, Helvetica, sans-serif;
  color: #29a329;
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

export const Pagination = styled.div`
  display: flex;
  min-width: 500px;
  justify-content: space-between;
  margin-top: 20px;
  color: #d9d9d9;
  font-weight: 600;
  font-family: Arial, Helvetica, sans-serif;
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

export const CommentDate = styled.time`
  color: #d9d9d9;
`;

export const LikeIcon = styled.img`
  &:hover {
    cursor: pointer;
  }
`;
