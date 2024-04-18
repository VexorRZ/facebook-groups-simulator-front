import React from "react";
import { Container } from "./styles";

interface ILoadingProps {
  visible?: boolean;
  ref?: React.Ref<HTMLInputElement>;
}

const Loader = ({ visible, ref }: ILoadingProps) => {
  return <Container ref={ref} />;
};

export default Loader;
