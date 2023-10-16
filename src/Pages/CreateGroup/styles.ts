/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import styled, { css } from "styled-components";

interface IButtonProps {
  height?: string;
  width?: string;
  marginTop?: string;
}

interface IDropzone {
  isDragActive?: boolean;
  isDragReject?: boolean;
}

interface IPreview {
  src: string;
}

interface IUploadMessage {
  message?: "default" | "error" | "success";
}

const dragActive = css`
  border-color: #78e5d5;
`;

const dragReject = css`
  border-color: #e57878;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  width: 600px;
  height: 650px;
  border-radius: 6px;
  background-color: #25282e;
  margin: auto;
  margin-top: 20px;
  border: 1px solid #526173;
  padding: 10px;
  box-shadow: 18px 19px 32px -11px rgba(0, 0, 0, 1);
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
export const GroupType = styled.select`
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

export const StyledOption = styled.option``;

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

export const DropContainer = styled.div.attrs({
  className: "dropzone",
})<IDropzone>`
  border: 1px dashed #ddd;
  border-radius: 4px;
  cursor: pointer;

  transition: height 0.2s ease;

  ${(props) => props.isDragActive && dragActive};
  ${(props) => props.isDragReject && dragReject};
`;

export const UploadMessage = styled.p<IUploadMessage>`
  display: flex;
  color: ${(props) => props.message || "default"};
  justify-content: center;
  align-items: center;
  padding: 15px 0;
`;

export const Preview = styled.div<IPreview>`
  width: 36px;
  height: 36px;
  border-radius: 5px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
`;
