import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const GroupCardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 10px;
`;

export const UserCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  width: 600px;
  border-radius: 6px;
  box-shadow: 0vh;
  background-color: #25282e;
  border: 1px solid #526173;
  padding: 10px;
  box-shadow: 18px 19px 32px -11px rgba(0, 0, 0, 1);

  &:hover {
    cursor: pointer;
  }
`;

export const UserCardAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

export const UserdataArea = styled.div`
  display: flex;
  flex-direction: row;
`;

export const UserCardName = styled.h4`
  margin-left: 8px;
`;
