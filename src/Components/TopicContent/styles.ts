import styled from "styled-components";
import { Chat } from "@material-ui/icons";
interface ITopbarIconBadgeProps {
  isRingBell?: boolean;
}

interface ItopicContent {
  URlGroup?: boolean;
}

export const Container = styled.div<ItopicContent>`
  transition: transform 250ms;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
  border: 1px solid #293544;
  border-radius: 6px;
  max-height: 56px;

  &:hover {
    cursor: pointer;
    background-color: #303640;
    transition: all 0.2s ease-in;
    transition: ${(props) =>
      props.URlGroup ? " all 0.3s ease-in" : "all 0.2s ease-in"};
    transform: ${(props) =>
      props.URlGroup ? "translateX(4px)" : "translateY(-3px)"};
    background-color: #373e4a;
  }
`;

export const TopicName = styled.h4`
  width: 60%;
  margin-left: 10px;
  color: #ebeff5;
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

export const TopbarIconteItem = styled.div`
  margin-right: 17px;
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const TopbarIconBadge = styled.span<ITopbarIconBadgeProps>`
  width: 15px;
  height: 15px;
  background-color: red;
  opacity: 0.8;
  border-radius: 50%;
  color: black;
  position: absolute;
  top: -5px;
  right: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`;

export const ChatItem = styled(Chat)`
  color: #ebeff5;
  opacity: 0.8;
`;

export const Comments = styled.div`
  color: #ebeff5;
`;
