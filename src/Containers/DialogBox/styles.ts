import styled from "styled-components";

interface IContainerProps {
  visible: boolean;
}

export const Container = styled.div<IContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 475px;
  height: 110px;
  box-shadow: 0vh;
  background-color: #25282e;
  margin: auto;
  border: 1px solid #526173;
  box-shadow: 18px 19px 32px -11px rgba(0, 0, 0, 1);
  padding: 20px;
  position: absolute;
  z-index: 99;
`;

export const OptionsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
`;

export const DialogText = styled.strong`
  font-size: 18px;
`;
