import styled, { keyframes } from "styled-components";

interface IMessagetoastProps {
  messageType: string | "login" | "logout" | "success" | "error";
}

export const ToastContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: black;
  width: 360px;
  height: 90px;
  border-radius: 6px;
`;

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
  to {
      
      transform: scaleX(0);
    }
  
  `;

export const ToastMessage = styled.p<IMessagetoastProps>`
  margin: 0;
  color: ${getMessageColor};
  font-weight: 900;
  font-family: sans-serif;
`;

export const TimerBar = styled.div`
  height: 5px;
  background: linear-gradient(to bottom, red, #900);
  --duration: 5;
  animation: ${roundTime} calc(var(--duration) * 1s) steps(var(--duration))
    forwards;
  transform-origin: left center;
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
