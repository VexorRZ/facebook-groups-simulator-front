import styled from "styled-components";

export const IconContainer = styled.div`
  background-color: white;
  border-radius: 6px;
  width: 110px;
  height: 43px;
  border: 0.5px solid gray;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
  &:hover {
    cursor: pointer;
  }
  p {
    margin: 0;
    font-weight: bold;
    font-size: 13px;
  }
`;
