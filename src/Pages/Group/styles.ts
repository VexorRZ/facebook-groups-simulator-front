import styled from "styled-components";
import ChatIcon from "@mui/icons-material/Chat";
import GroupsIcon from "@mui/icons-material/Groups";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import DescriptionIcon from "@mui/icons-material/Description";
import GavelIcon from "@mui/icons-material/Gavel";

import { Link } from "react-router-dom";
import RadioGroup from "@mui/material/RadioGroup";
interface IPaginationProps {
  isSelect?: boolean;
}

interface IProfileEditorContainerProps {
  width?: string;
  height?: string;
}

interface IStyledRadioGroupProps {
  radioActive: boolean;
}

export const StyledAdminIcon = styled(AdminPanelSettingsIcon)`
  color: #565f82;
`;
export const StyledGroupsList = styled(GroupsIcon)`
  color: #565f82;
`;
export const StyledChatIcon = styled(ChatIcon)`
  color: #565f82;
`;
export const StyledDescriptionIcon = styled(DescriptionIcon)`
  color: #565f82;
`;
export const StyledGavelIcon = styled(GavelIcon)`
  color: #565f82;
`;

export const NavBar = styled.ul`
  border-radius: 6px;
  width: 550px;
  z-index: 99;
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  height: 50px;
  display: flex;
  align-items: center;
  background: #090a0d;
  justify-content: center;
  color: white;
  gap: 28px;
  box-shadow: 18px 8px 12px 0px rgba(8, 9, 16, 4);
`;

export const NavBarItem = styled.li`
  float: left;
  display: flex;
  gap: 2px;
  align-items: center;
  h4 {
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
  gap: 8px;
  flex: 6;
  margin-top: 36px;
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

export const GroupEditorContainer = styled.div<IProfileEditorContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  background-color: #25282e;
  border: 1px solid #526173;
  padding: 10px;
  box-shadow: 18px 19px 32px -11px rgba(0, 0, 0, 1);
  width: ${(props) => props.width ?? "600px"};
  height: ${(props) => props.height ?? "600px"};
  z-index: 900;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
`;

export const CloseIconDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  z-index: 9999;
  width: 100%;
`;

export const DataArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 40px;
  margin-top: 80px;
`;

export const EditProfileFieldWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CardOptions = styled.div`
  height: 112px;
  width: 339px;
  display: flex;
  flex-direction: column;
  background-color: #25282e;
  border: solid 1px white;
  padding: 10px;
`;

export const StyledRadioGroup = styled(RadioGroup)<IStyledRadioGroupProps>`
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
  gap: 21px !important;
  justify-content: flex-start !important;

  .option-description {
    font-size: 10px;
    color: ${(props) => (props.radioActive ? "#1976d2" : "#fff")};
  }
  .radio-options {
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 6px;
    padding: 2px;
    &:hover {
      background-color: #373e4a;
    }
  }

  .css-17yyoxz-MuiFormControlLabel-root {
    margin-left: 0px !important;
  }
  .css-1yyanpp-MuiFormControlLabel-root {
    margin-left: 0px !important;
  }
`;

export const ProfileEditorContainer = styled.div<IProfileEditorContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  background-color: #25282e;
  border: 1px solid #526173;
  padding: 10px;
  box-shadow: 18px 19px 32px -11px rgba(0, 0, 0, 1);
  width: ${(props) => props.width ?? "600px"};
  height: ${(props) => props.height ?? "600px"};
  z-index: 900;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
`;

export const NavBarWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const GroupInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  gap: 24px;
`;
export const GroupImage = styled.img``;

export const GroupTitle = styled.h3`
  color: white;
`;

export const TopicTitle = styled.h5``;

export const TopicAuthor = styled.h6``;
