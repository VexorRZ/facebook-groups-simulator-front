import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
  border: 1px solid #526173;
  width: 500px;
  height: 500px;
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  box-shadow: 0vh;
  background-color: #25282e;
  box-shadow: 18px 19px 32px -11px rgba(0, 0, 0, 1);

  div {
    color: #ebeff5;
  }
`;

export const ErrorMessage = styled.h4`
  color: red;
  font-weight: bold;
  margin: 0;
`;

export const Title = styled.h2`
  margin: 0;
  text-align: center;
  color: #ebeff5;
`;

export const Resume = styled.h5`
  margin: 0;
  margin-top: 64px;
  color: #ebeff5;
`;

export const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
  p {
    margin: 0;
  }
`;

export const IconsContainer = styled.div`
  margin-top: 40px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: #ebeff5;
  margin-top: 6px;
  &:hover {
    color: gray;
    cursor: pointer;
  }
`;

export const ForgottLink = styled.link`
  color: #ebeff5;
  :hover {
    color: red;
    cursor: pointer;
  }
`;
