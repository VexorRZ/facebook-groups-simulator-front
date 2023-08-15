import styled from "styled-components";

interface ItopicContent {
  URlGroup?: boolean;
}

export const Container = styled.div<ItopicContent>`
  transition: transform 250ms;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #b2becc;
  border: 1px solid #293544;
  border-radius: 6px;
  max-height: 62px;

  &:hover {
    cursor: pointer;
    transition: all 0.2s ease-in;
    transition: ${(props) =>
      props.URlGroup ? " all 0.3s ease-in" : "all 0.2s ease-in"};
    transform: ${(props) =>
      props.URlGroup ? "translateX(4px)" : "translateY(-10px)"};
    background-color: #d6e0eb;
  }
`;

export const TopicName = styled.h4`
  width: 60%;
`;

export const Comments = styled.span`
  width: 20%;
`;

export const NumberOfComments = styled.div`
  background-color: #ff0000;
  width: 19px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  border: solid 1px #3e4d60;

  &:hover {
    transition: all 0.2s ease-in;
    background-color: #fc4e4e;
  }
`;

export const CommentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 8px;
`;
