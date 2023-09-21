import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  margin-top: 60px;
  width: 1400px;
  height: 70vh;
  border-radius: 6px;
  box-shadow: 0vh;
  background-color: #25282e;
  border: 1px solid #526173;
  padding: 10px;
  box-shadow: 18px 19px 32px -11px rgba(0, 0, 0, 1);
`;

export const ProfileText = styled.p`
  display: flex;
`;

export const UserAvatar = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
`;

export const Title = styled.h3`
  display: flex;
`;

export const ProfiletextWrapper = styled.div``;

export const ProfileStatistics = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 6px;

  hr {
    border-top: 2px solid #bbb;
    width: 100px;
  }
`;

export const StatisticProfileItem = styled.p`
  margin: 0;
  text-align: center;
  font-family: sans-serif;
  font-weight: 900;
  font-size: 13px;
`;

export const StatisticsItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
