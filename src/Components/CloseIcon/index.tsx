import React from "react";

import { Container, XIcon } from "./styles";

interface IbuttonProps {
  onClick?: (param?: any) => void;
}

const CloseIcon = ({ onClick }: IbuttonProps) => {
  return (
    <Container>
      <XIcon onClick={onClick} />
    </Container>
  );
};

export default CloseIcon;
