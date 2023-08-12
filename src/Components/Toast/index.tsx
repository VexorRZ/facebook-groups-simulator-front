import React from "react";

import { CloseIcon, ToastContainer, ToastMessage, TimerBar } from "./styles";

interface IToastProps {
  messageType: string;
}

const Toast = ({ messageType }: IToastProps) => {
  return (
    <ToastContainer>
      <ToastMessage messageType={messageType}>
        <div className="round-time-bar" />
      </ToastMessage>
      <CloseIcon />
      <TimerBar />
    </ToastContainer>
  );
};

export default Toast;
