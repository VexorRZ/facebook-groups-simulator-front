import styled from "styled-components";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";

export const Container = styled.div`
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  margin-left: 18px;
  width: 300px;
  background: #25282e;
  position: sticky;
  top: 85px;
  height: 100%;
  border: 1px solid #526173;
  ::-webkit-scrollbar {
    width: 30px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const ElementArea = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: 10px;
  h6 {
    color: #ebeff5;
    font-family: sans-serif;
  }
  &:hover {
    cursor: pointer;
  }
`;

export const GroupsList = styled.div``;

export const StyledAccountCircleIcon = styled(AccountCircleIcon)`
  background-color: #ebeff5;
`;
export const StyledGroupsList = styled(GroupsIcon)`
  background-color: #ebeff5;
`;
export const StyledGroupsIcon = styled(PersonIcon)`
  background-color: #ebeff5;
`;
