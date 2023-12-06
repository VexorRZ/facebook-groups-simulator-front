import styled from "styled-components";
import { ReactComponent as CloseSvg } from "../../assets/icons/close-icon.svg";

interface IContainerProps {
  bluried: boolean;
}

interface IProfileEditorContainerProps {
  width?: string;
  height?: string;
}

export const Container = styled.div<IContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  margin-top: 60px;
  width: 1400px;
  height: 65vh;
  border-radius: 6px;
  box-shadow: 0vh;
  background-color: #25282e;
  border: 1px solid #526173;
  padding: 10px;
  box-shadow: 18px 19px 32px -11px rgba(0, 0, 0, 1);
  filter: ${(props) => (props.bluried ? `blur(0.2rem)` : `blur(0.0rem)`)};
`;

export const ProfileText = styled.p`
  display: flex;
`;

export const UserAvatar = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  border: 1px solid black;

  .userAvatarHover {
    width: 200px;
    height: 200px;
    border-radius: 0%;
    background-color: gray;
    opacity: 0.5;
    display: none;
    position: relative;
    bottom: -65%;
    gap: 6px;
  }

  &:hover {
    cursor: pointer;

    .userAvatarHover {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
    }
  }
`;

export const Title = styled.h3`
  display: flex;
`;

export const ProfiletextWrapper = styled.div``;

export const ProfileStatisticsColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 6px;

  hr {
    border-top: 1px solid #bbb;
    width: 1px;
    margin-left: 10px;
  }
`;

export const StatisticProfileItem = styled.p`
  margin: 0;
  text-align: center;
  font-family: sans-serif;
  font-weight: 900;
  font-size: 13px;
  margin-left: 10px;
`;

export const StatisticsItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ProfileStatisticsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 110px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: flex-end;
`;

export const ProfileEditorContainer = styled.div<IProfileEditorContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  background-color: #25282e;
  border: 1px solid #526173;
  padding: 10px;
  box-shadow: 18px 19px 32px -11px rgba(0, 0, 0, 1);
  width: ${(props) => props.width ?? "600px"};
  height: ${(props) => props.height ?? "600px"};
  z-index: 900;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
`;

export const EditProfileFieldWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CloseIcon = styled(CloseSvg)`
  border-radius: 50px;

  &:hover {
    cursor: pointer;
    background-color: black;
  }
`;

export const CloseIconDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  z-index: 9999;
  width: 100%;
`;

export const DataArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 40px;
  margin-top: 80px;
`;
