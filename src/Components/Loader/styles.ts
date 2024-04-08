import styled, { keyframes } from "styled-components";

interface ILoadingProps {
  visible?: boolean;
}

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div<ILoadingProps>`
  width: 0;
  height: 0;
  border-top: 40px solid transparent;
  border-right: 68px solid lightblue;
  border-bottom: 40px solid transparent;
  /* display: ${(props) => (props.visible ? "inline-block" : "none")}; */
  animation: ${rotate} 2s linear infinite;
  z-index: 1000;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -50px;
  margin-left: -50px;
`;
