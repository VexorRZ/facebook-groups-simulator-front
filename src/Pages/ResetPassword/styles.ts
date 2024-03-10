import styled from "styled-components";

export const Container = styled.div`
  padding: 30px;
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
  p {
    color: white;
  }
`;

export const ErrorMessage = styled.h4`
  color: red;
  font-weight: bold;
  margin: 0;
`;
