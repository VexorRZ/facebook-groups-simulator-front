/* eslint-disable @typescript-eslint/member-delimiter-style */
import styled from "styled-components";

interface ICustomButton {
  customBackgroundColor?: string;
  customColor?: string;
  width?: string;
  height?: string;
  marginTop?: string;
  opacity?: number;
}

export const ButtonStyles = styled.button<ICustomButton>`
  height: ${(props) => props.height ?? "38px"};
  width: ${(props) => props.width ?? "414px"};
  margin-top: ${(props) => props.marginTop};
  background-color: ${(props) => props.customBackgroundColor};
  color: ${(props) => props.customColor};
  border: 0px none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    opacity: ${(props) => props.opacity};
  }
`;
