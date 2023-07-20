import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: 400px;
  height: 350px;
  border: 1px solid #f2f2f2;
  margin: auto;
  border-radius: 6px;
  background-color: #f0f0f0;
`;

export const Title = styled.h1`
  font-weight: bold;
  color: black;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  h5 {
    margin: 0;
    margin-bottom: 2px;
  }
`;

export const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 8px;
  gap: 6px;
  p {
    color: red;
    margin: 0;
  }
`;
