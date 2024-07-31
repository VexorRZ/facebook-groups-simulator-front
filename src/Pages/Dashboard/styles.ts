import styled from "styled-components";

export const Content = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const GroupCardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  h1 {
    font-family: sans-serif;
    margin-left: 40px;
    color: #ebeff5;
  }
`;

export const NoTopicsCard = styled.div`
  transition: transform 250ms;
  display: flex;
  align-items: center;
  border-radius: 6px;
  max-height: 62px;
  justify-content: center;
  height: 400px;
  margin-left: 40px;
  background-color: #0e1014;
  box-shadow: 18px 8px 12px 0px rgba(8, 9, 16, 4);
  color: red;
  font-size: 16px;
  font-family: math;
`;
