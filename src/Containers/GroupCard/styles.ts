import styled from "styled-components";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import GroupsIcon from "@mui/icons-material/Groups";
import ChatIcon from "@mui/icons-material/Chat";
import PublicIcon from "@mui/icons-material/Public";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";

interface IinfoWraperProps {
  gap?: string;
}

interface cardButtonProps {
  visible?: boolean;
}

interface IcontainerProps {
  marginLeft?: string;
}

interface INavBarProps {
  statusColor?: string;
}

export const StyleAdminIcon = styled(AdminPanelSettingsIcon)`
  color: #565f82;
`;
export const StyledGroupsIcon = styled(GroupsIcon)`
  color: #565f82;
`;
export const StyledChatIcon = styled(ChatIcon)`
  color: #565f82;
`;

export const StyledPublicIcon = styled(PublicIcon)`
  color: #565f82;
`;

export const Container = styled.div<IcontainerProps>`
  gap: 28px;
  display: flex;
  width: 708px;
  border-radius: 6px;
  box-shadow: 0vh;
  background-color: #0e1014;
  margin-left: 40px;
  padding: 10px;
  box-shadow: 18px 8px 12px 0px rgba(8, 9, 16, 4);
`;

export const NavBar = styled.div`
  border-radius: 6px;
  width: 100%;
  z-index: 99;
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  gap: 28px;
`;

export const NavBarItem = styled.div`
  float: left;
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const NavBarItemLabel = styled.h6<INavBarProps>`
  display: flex;
  gap: 6px;
  font-weight: bold;
  color: ${(props) => (props.statusColor ? props.statusColor : "#c3c8d6")};
  margin: 0;
  P {
    color: blue;
    margin: 0;
  }
`;

export const NavBarItemNumber = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    margin: 0;
    color: rebeccapurple;
    font-weight: bold;
  }
`;

export const GroupDescription = styled.h6``;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const GroupInfo = styled.div`
  display: flex;
  flex-direction: row;
`;

export const GroupCardHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 14px;
  flex-direction: column;
`;

export const GroupTitle = styled.h4`
  width: 100%;
  color: #ebeff5;
  border-radius: 16px;
  font-family: sans-serif;
`;

export const TopicList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const TopicContent = styled.div`
  transition: transform 250ms;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border: 1px solid #fafbff;
  border-radius: 24px;

  &:hover {
    cursor: pointer;
    transform: translateY(-10px);
  }
`;

export const TopicName = styled.h4`
  width: 60%;
`;

export const NumberOfComments = styled.span`
  width: 20%;
`;

export const GroupAvatar = styled.img`
  min-width: 120px;
  width: 120px;
  height: 120px;
  border: 1px solid;
  border-radius: 14px;
  border-right: solid 1px #526173;
  border-top: solid 1px #526173;
`;

export const GroupInfoArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
`;

export const InfoWrapper = styled.div<IinfoWraperProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 16px;
  gap: ${(props) => (props.gap ? props.gap : "0px")};
  margin-bottom: 10px;
`;

export const CardButton = styled.button<cardButtonProps>`
  display: ${(props) => (props.visible ? "flex" : "none")};
  background-color: transparent;
  border: 1px solid #373e4a;
  opacity: 0.7;
  white-space: nowrap;
  color: hsla(150, 14%, 97%, 1);
  cursor: pointer;
  outline: none;
  text-shadow: 0.1rem 0.1rem 0.5rem hsla(0, 0%, 0%, 0.5);
  letter-spacing: 0.1rem;
  border-radius: 0.5rem;
  user-select: none;
  padding: 1.5rem 2rem;
  transition: all 0.1s ease-in;
  font-size: 11px;
  width: 100px;
  height: 50px;
  align-items: center;
  justify-content: center;
  color: green;
  font-family: math;
  font-weight: 900;

  ::-moz-focus-inner {
    border: 0;
  }

  &:hover {
    background-color: #373e4a;
  }

  &:active {
    background-color: hsla(40, 72%, 35%, 1);
  }
`;

export const ButtonArea = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;

export const AmountWrapper = styled.div`
  background-color: #06b81e;
  max-width: 20px;
  min-width: 20px;
  max-height: 20px;
  min-height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: solid 1px #3e4d60;
`;

export const InfoText = styled.h5`
  margin: 0;
  width: 100%;
  color: #ebeff5;
  font-family: sans-serif;
`;

export const LastTopics = styled.h4`
  font-family: sans-serif;
  text-decoration: underline;
  font-weight: 900;
  background-color: #25282e;
  text-align: center;
  color: #ebeff5;
`;

export const TitleAndStatus = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const CenterArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const StatusWrapper = styled.div`
  display: flex;
  justify-items: center;
  gap: 2px;
`;

export const StatusText = styled.div`
  h6 {
    font-weight: bold;
    color: #c3c8d6;
  }
  strong {
    color: ${(props) => (props.color ? props.color : "white")};
  }
`;
