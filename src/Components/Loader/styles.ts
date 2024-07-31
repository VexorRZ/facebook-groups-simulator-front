import styled, { keyframes } from "styled-components";
import { ReactComponent as Loading } from "../../assets/icons/loading.svg";

interface ILoadingProps {
  visible?: boolean;
  ref?: React.Ref<HTMLInputElement>;
}

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const StyledLoading = styled(Loading)<ILoadingProps>`
  width: 50px;
  height: 50px;
  color: red;
  animation: ${rotate} 2s linear infinite;
  /* border-top: 40px solid transparent;
  border-right: 68px solid lightblue;
  border-bottom: 40px solid transparent; */
`;

export const Container = styled.div`
  z-index: 1000;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -50px;
  margin-left: -50px;
`;
