import React from "react";

import { IconContainer } from "./styles";

interface IIcontainerProps {
  children: React.ReactNode;
}

const IconEncapsulator = ({ children }: IIcontainerProps) => {
  return <IconContainer>{children}</IconContainer>;
};

export default IconEncapsulator;
