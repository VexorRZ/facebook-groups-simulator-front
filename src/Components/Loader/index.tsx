import React from "react";
import { Container, StyledLoading } from "./styles";

interface ILoadingProps {
  ref?: React.Ref<HTMLInputElement>;
}

const Loader = ({ ref }: ILoadingProps) => {
  return (
    <Container ref={ref}>
      <StyledLoading />
    </Container>
  );
};

export default Loader;
