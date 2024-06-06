/* eslint-disable @typescript-eslint/member-delimiter-style */
import styled from "styled-components";

interface ICustomInput {
  customBackgroundColor?: string;
  customColor?: string;
  customBorderColor?: string;
  width?: string;
  customMarginTop?: string;
}

export const StylezedInput = styled.input<ICustomInput>`
  height: 32px;
  width: 400px;
  border: 0.5px solid;
  border-radius: 6px;
  text-align: center;
  width: ${(props) => props.width ?? "408px"};
  margin-top: ${(props) => props.customMarginTop};
  background-color: ${(props) => props.customBackgroundColor};
  color: ${(props) => props.customColor};
  border-color: ${(props) => props.customBorderColor};
  background: #ffffff;
`;
