import React from "react";
import { Container } from "./styles";

interface ILoadingProps {
  visible?: boolean;
}

const Loader = ({ visible }: ILoadingProps) => {
  return <Container />;
};

export default Loader;
