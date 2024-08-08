/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { styled } from "styled-components";
import RadioGroup from "@mui/material/RadioGroup";

interface IButtonProps {
  height?: string;
  width?: string;
  marginTop?: string;
}

interface IStyledRadioGroupProps {
  radioActive: boolean;
}

export const CardOptions = styled.div`
  height: 112px;
  width: 339px;
  display: flex;
  flex-direction: column;

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
    color: ${(props) => (props.radioActive ? "white" : "white")};
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

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  width: 600px;
  height: 770px;
  border-radius: 6px;
  background-color: #25282e;
  margin: auto;
  margin-top: 20px;
  padding: 10px;
  background-color: #0e1014;
  box-shadow: 18px 8px 12px 0px rgba(8, 9, 16, 4);
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  margin-top: 20px;
  flex: 6;
`;

export const GroupName = styled.input`
  height: ${(props) => (props.height ? props.height : "40px")};
  width: 360px;
  background: black;
  color: white;
  border-radius: 4px;
  text-align: center;
  font-size: 20px;
  border: 1px solid #a0a2a6;
`;
export const GroupType = styled.div`
  height: 40px;
  width: 360px;
  background: black;
  border: none;
  color: white;
  border-radius: 4px;
  text-align: center;
  font-size: 20px;
  border: 1px solid #a0a2a6;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 2px;
`;

export const GroupAvatar = styled.img`
  border-radius: 50%;
  width: 160px;
  height: 160px;
`;

export const Footer = styled.footer`
  display: flex;
  flex-direction: row;
  flex: 3;
`;

export const Button = styled.button<IButtonProps>`
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  margin-top: ${(props) => props.marginTop};
  background-color: #373e4a;
  opacity: 0.7;
  border: none;
  white-space: nowrap;
  color: hsla(150, 14%, 97%, 1);
  cursor: pointer;
  outline: none;
  font-size: 1rem;
  text-shadow: 0.1rem 0.1rem 0.5rem hsla(0, 0%, 0%, 0.5);
  letter-spacing: 0.1rem;
  border-radius: 0.5rem;
  user-select: none;
  padding: 1.5rem 2rem;
  transition: all 0.1s ease-in;
  display: flex;
  align-items: center;
  justify-content: center;

  ::-moz-focus-inner {
    border: 0;
  }

  &:hover {
    background-color: #556073;
  }

  &:active {
    background-color: hsla(40, 72%, 35%, 1);
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Option = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 12px;
`;

export const OptionText = styled.strong`
  font-size: 10px;
  color: gray;
`;

export const GroupPrivacy = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;
