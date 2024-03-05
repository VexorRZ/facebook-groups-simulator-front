import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    color: white;
  }
`;

export const ErrorMessage = styled.h4`
  color: red;
  font-weight: bold;
  margin: 0;
`;
