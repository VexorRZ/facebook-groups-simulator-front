import styled from "styled-components";
import DefaulGrouPic from "../../assets/images/default-pic.jpg";

interface IUploadMessage {
  messageType?: "default" | "success" | "error";
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const IframeBox = styled.iframe`
  width: 100%;
`;
export const Image = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 1px solid black;
`;
export const FilesPreview = styled.div`
  display: flex;
  width: 164px;
  height: 164px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const RegectedFiles = styled.div`
  width: 50%;
`;
export const AceptedFiles = styled.div`
  width: 50%;
  justify-content: center;
  text-align: center;
  border-right: 1px solid #aaa;
`;
export const FilesContainer = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  padding: 10px;
`;
export const DragContainer = styled.div`
  padding: 9px 10px;
  border: none;
  border-radius: 50%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: url(${DefaulGrouPic}) no-repeat center;
  background-size: cover;

  &:hover {
    cursor: pointer;
  }
`;

export const UploadMessage = styled.p<IUploadMessage>`
  position: absolute;
  margin-top: 232px;
  display: flex;
  color: ${(props) => props.color};
  justify-content: center;
  align-items: center;
`;
