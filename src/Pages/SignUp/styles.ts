import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  border-radius: 12px;
  width: 500px;
  height: 500px;
`;

export const ErrorMessage = styled.h4`
  color: red;
  font-weight: bold;
  margin: 0;
`;

export const Title = styled.h2`
  margin: 0;
  text-align: center;
  color: #000;
`;

export const Resume = styled.h5`
  margin: 0;
  margin-top: 64px;
  color: #000;
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
  color: black;
  margin-top: 6px;
  &:hover {
    color: gray;
    cursor: pointer;
  }
`;

export const ForgottLink = styled.link`
  color: blue;
  :hover {
    color: red;
    cursor: pointer;
  }
`;
