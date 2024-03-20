import React from "react";

import { Container } from "./styles";

interface IGroupContainerProps {
  children?: React.ReactNode;
}

const GroupContainer = ({ children }: IGroupContainerProps) => {
  return <Container>{children}</Container>;
};

export default GroupContainer;
