import React from "react";
import { Container } from "./styles";

interface ILoadingProps {
  visible: boolean;
}

const Loading = ({ visible }: ILoadingProps) => {
  return <Container visible={visible} />;
};

export default Loading;
