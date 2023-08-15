import styled, { keyframes } from "styled-components";

interface IMessagetoastProps {
  messageType: string | "login" | "logout" | "success" | "error";
}

const defaultColor = "#000100";

function getMessageColor({ messageType }: IMessagetoastProps) {
  switch (Boolean(messageType)) {
    case messageType === "login": {
      return "#00fc00";
    }
    case messageType === "logout": {
      return "#efbe00";
    }
    case messageType === "success": {
      return "#00ce00";
    }
    case messageType === "error": {
      return "#f30000";
    }

    default:
      return defaultColor;
  }
}

const roundTime = keyframes` 
   0% {
    width: 0;
  }
  100% {
    width: 300px;
  }
  
  `;

export const ToastContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: black;
  width: 360px;
  height: 90px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
`;

export const ToastMessage = styled.p<IMessagetoastProps>`
  margin: 0;
  color: ${getMessageColor};
  font-weight: 900;
  font-family: sans-serif;
`;

export const TimerBar = styled.div`
  width: 300px;
  height: 5px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  background-color: green;
  animation-name: ${roundTime};
  animation-duration: 6s;
  float: left;
`;

export const CloseIcon = styled.div`
  border-radius: 50%;
  background-color: transparent;
  .x::before,
  .x::after {
    content: "";
    display: block;
    margin-top: -3px;
    width: 20px;
    height: 3px;
    background: #000;
    border-radius: 1px;
  }
  .x::before {
    -webkit-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  .x::after {
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;
