import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
  border: 1px solid #526173;
  width: 400px;
  height: 350px;
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  box-shadow: 0vh;
  background-color: #25282e;
  box-shadow: 18px 19px 32px -11px rgba(0, 0, 0, 1);
`;

export const Title = styled.h1`
  font-weight: bold;
  color: #ebeff5;
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
  h5 {
    color: #ebeff5;
  }
`;
