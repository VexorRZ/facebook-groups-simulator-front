/* eslint-disable no-unneeded-ternary */
/* eslint-disable multiline-ternary */
/* eslint-disable react/jsx-key */
import React from "react";
import { useDropzone } from "react-dropzone";

import {
  DragContainer,
  FilesPreview,
  Image,
  Container,
  UploadMessage,
} from "./styles";

interface IDropZone {
  files?: File[];
  onDrop: (param: any[]) => void;
  previewMessage: string;
}

const CustomDropzone = ({ files, previewMessage, onDrop }: IDropZone) => {
  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      maxFiles: 1,

      onDrop: (param: any) => {
        onDrop(param);
      },
    });

  const renderDragMessage = (isDragActive: boolean, isDragReject: boolean) => {
    if (!isDragActive) {
      return (
        <UploadMessage messageType="default" color="#999">
          {previewMessage}
        </UploadMessage>
      );
    }

    if (isDragReject) {
      return (
        <UploadMessage color="#e57878" messageType="error">
          Arquivo não suportado
        </UploadMessage>
      );
    }

    return (
      <UploadMessage messageType="success" color="#78e5d5">
        Solte a foto aqui
      </UploadMessage>
    );
  };

  const Preview = files?.map((file: any) => (
    <div>
      <Image src={file.preview} />
    </div>
  ));

  return (
    <Container>
      <DragContainer {...getRootProps({ className: "dropzone" })}>
        <FilesPreview>{Preview}</FilesPreview>

        <input {...getInputProps()} />
        {renderDragMessage(isDragActive, isDragReject)}
      </DragContainer>
    </Container>
  );
};
export default CustomDropzone;
