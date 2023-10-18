import styled from "styled-components";
import { ReactComponent as CloseSvg } from "../../assets/icons/close-icon.svg";

export const XIcon = styled(CloseSvg)`
  border-radius: 50px;
  background-color: red;

  &:hover {
    cursor: pointer;
    background-color: black;
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  z-index: 999;
  width: 100%;
`;
