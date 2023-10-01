import styled from "styled-components";

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
  width: 164px;
  height: 164px;
  border-radius: 50%;
  border: 1px solid black;
`;
export const FilesPreview = styled.div`
  display: flex;
  width: 164px;
  height: 164px;
  border-radius: 50%;
  border: 1px solid black;
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
  padding: 0px 10px;
  border: 2px dotted #aaa;
  border-radius: 10px;
  background-color: #eee;
  text-align: center;

  &:hover {
    cursor: pointer;
  }
`;

export const UploadMessage = styled.p<IUploadMessage>`
  display: flex;
  color: ${(props) => props.color};
  justify-content: center;
  align-items: center;
  padding: 15px 0;
`;
