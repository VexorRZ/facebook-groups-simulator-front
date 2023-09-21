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
  gap: 40px;

  h1 {
    font-family: sans-serif;
    margin-left: 40px;
    color: #ebeff5;
  }
`;

export const NoTopicsCard = styled.div`
  transition: transform 250ms;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #303640;
  border: 1px solid #293544;
  border-radius: 6px;
  max-height: 62px;
  justify-content: center;
  height: 200px;
`;
