import React from "react";

import { CloseIcon, ToastContainer, ToastMessage, TimerBar } from "./styles";

interface IToastProps {
  messageType: string;
}

const Toast = ({ messageType }: IToastProps) => {
  return (
    <>
      <ToastContainer>
        <ToastMessage messageType={messageType}></ToastMessage>
        <CloseIcon />
      </ToastContainer>
      <TimerBar />
    </>
  );
};

export default Toast;
