/* eslint-disable @typescript-eslint/member-delimiter-style */
import styled from "styled-components";

interface ICustomButton {
  customBackgroundColor?: string;
  customColor?: string;
  width?: string;
  height?: string;
  marginTop?: string;
  opacity?: number;
  customBorder?: string;
}

export const ButtonStyles = styled.button<ICustomButton>`
  height: ${(props) => (props.height ? props.height : "38px")};
  width: ${(props) => (props.width ? props.width : "414px")};
  margin-top: ${(props) => (props.marginTop ? props.marginTop : "0px")};
  background-color: ${(props) =>
    props.customBackgroundColor ? props.customBackgroundColor : " #373e4a"};
  color: ${(props) => props.customColor};
  border: ${(props) => (props.customBorder ? props.customBorder : "0px none")};
  border-radius: 6px;
  transition: all 0.1s ease-in;
  text-shadow: 0.1rem 0.1rem 0.5rem hsla(0, 0%, 0%, 0.5);
  font-size: 12px;
  font-family: math;
  letter-spacing: 0.1rem;
  border-radius: 0.5rem;
  user-select: none;

  &:hover {
    opacity: ${(props) => props.opacity};
    background-color: #556073;
    cursor: pointer;
  }
`;
