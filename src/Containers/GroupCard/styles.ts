import styled from "styled-components";

interface IinfoWraperProps {
  gap?: string;
}

interface cardButtonProps {
  visible?: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  border-radius: 6px;
  box-shadow: 0vh;
  background-color: #25282e;
  margin-left: 40px;
  border: 1px solid #526173;
  padding: 10px;
  box-shadow: 18px 19px 32px -11px rgba(0, 0, 0, 1);
`;

export const GroupCardHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 14px;
  flex-direction: column;
`;

export const GroupTitle = styled.h3`
  width: 100%;
  color: #ebeff5;
  border-radius: 16px;
  font-family: sans-serif;
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

export const GroupAvatar = styled.img`
  border-radius: 50%;
  width: 140px;
  height: 140px;
  border: 1px solid;
`;

export const GroupInfoArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
`;

export const InfoWrapper = styled.div<IinfoWraperProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 16px;
  gap: ${(props) => (props.gap ? props.gap : "0px")};
  margin-bottom: 10px;
`;

export const CardButton = styled.button<cardButtonProps>`
  display: ${(props) => (props.visible ? "block" : "none")};
  background-color: #373e4a;
  opacity: 0.7;
  border: none;
  white-space: nowrap;
  color: hsla(150, 14%, 97%, 1);
  cursor: pointer;
  outline: none;
  font-size: 1rem;
  text-shadow: 0.1rem 0.1rem 0.5rem hsla(0, 0%, 0%, 0.5);
  letter-spacing: 0.1rem;
  border-radius: 0.5rem;
  user-select: none;
  padding: 1.5rem 2rem;
  transition: all 0.1s ease-in;

  ::-moz-focus-inner {
    border: 0;
  }

  &:hover {
    background-color: #556073;
  }

  &:active {
    background-color: hsla(40, 72%, 35%, 1);
  }
`;

export const ButtonArea = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;

export const AmountWrapper = styled.div`
  background-color: #06b81e;
  width: 43px;
  height: 27px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: solid 1px #3e4d60;
`;

export const InfoText = styled.h5`
  margin: 0;
  width: 100%;
  color: #ebeff5;
  font-family: sans-serif;
`;

export const LastTopics = styled.h4`
  font-family: sans-serif;
  text-decoration: underline;
  font-weight: 900;
  background-color: #25282e;
  text-align: center;
  color: #ebeff5;
`;

export const TitleAndStatus = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const CenterArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const StatusWrapper = styled.div`
  display: flex;
  justify-items: center;
  gap: 2px;
`;

export const StatusText = styled.h5`
  color: ${(props) => (props.color ? props.color : "white")};
`;
