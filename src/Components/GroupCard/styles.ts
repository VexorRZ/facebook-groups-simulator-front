import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 300px;
  width: 540px;
  border-radius: 6px;
  box-shadow: 0vh;
  background-color: #3e4d60;
  margin-left: 40px;
  border: 1px solid #526173;
  padding: 10px;
  box-shadow: 18px 19px 32px -11px rgba(0, 0, 0, 1);
`;

export const GroupCardHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const GroupTitle = styled.h2`
  width: 60%;
`;

export const GroupNumberOfMembers = styled.span`
  width: 20%;
`;

export const TopicList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const TopicContent = styled.div`
  transition: transform 250ms;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border: 1px solid #fafbff;
  border-radius: 24px;

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
