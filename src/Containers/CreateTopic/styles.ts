import styled from "styled-components";
import { ReactComponent as CloseSvg } from "../../assets/icons/close-icon.svg";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  z-index: 99;
  margin: auto;
  width: 530px;
  height: 360px;
  border-radius: 6px;
  box-shadow: 0vh;
  background-color: #25282e;
  border: 1px solid #526173;
  padding: 10px;
  box-shadow: 18px 19px 32px -11px rgba(0, 0, 0, 1);
  position: absolute;
`;

export const CloseIcon = styled(CloseSvg)`
  border-radius: 50px;

  &:hover {
    cursor: pointer;
    background-color: black;
  }
`;

export const CloseIconDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  z-index: 9999;
  width: 100%;
`;

export const CustomSelect = styled.select`
  height: 40px;
  width: 360px;
  background: black;
  border: none;
  color: white;
  border-radius: 4px;
  text-align: center;
  font-size: 20px;
  border: 1px solid #a0a2a6;
`;

export const CustomOption = styled.option``;
