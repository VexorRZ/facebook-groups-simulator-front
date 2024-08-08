import styled from "styled-components";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";

interface IContainerProps {
  position?: string;
}
export const Container = styled.div<IContainerProps>`
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  margin-left: 18px;
  width: 300px;
  position: ${(props) => (props.position ? props.position : "sticky")};
  top: 85px;
  height: 100%;
  background-color: #0e1014;
  box-shadow: 18px 8px 12px 0px rgba(8, 9, 16, 4);

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
  gap: 10px;
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
  color: #565f82;
`;
export const StyledGroupsList = styled(GroupsIcon)`
  color: #565f82;
`;
export const StyledGroupsIcon = styled(PersonIcon)`
  color: #565f82;
`;
