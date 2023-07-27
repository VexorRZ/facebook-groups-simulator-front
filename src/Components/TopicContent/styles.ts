import styled from "styled-components";

export const Container = styled.div`
  transition: transform 250ms;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border: 1px solid #fafbff;
  border-radius: 6px;

  &:hover {
    cursor: pointer;
    transform: translateY(-10px);
  }
`;

export const TopicName = styled.h4`
  width: 60%;
`;

export const NumberOfComments = styled.span`
  width: 20%;
`;
