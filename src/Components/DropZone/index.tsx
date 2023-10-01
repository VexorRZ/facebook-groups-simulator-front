/* eslint-disable no-unneeded-ternary */
/* eslint-disable multiline-ternary */
/* eslint-disable react/jsx-key */
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import defaulpic from "../../assets/images/default-pic.jpg";

import {
  DragContainer,
  FilesPreview,
  Image,
  Container,
  UploadMessage,
} from "./styles";

interface IDropZone {
  files: any[];
  onDrop: (param: any[]) => void;
}

const CustomDropzone = ({ files, onDrop }: IDropZone) => {
  const [image] = useState(defaulpic);
  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      maxFiles: 1,

      accept: {
        "image/*": [".png", "jpg", "jpeg"],
      },

      onDrop: (param) => {
        onDrop(param);
      },
    });

  const renderDragMessage = (isDragActive: boolean, isDragReject: boolean) => {
    if (!isDragActive) {
      return (
        <UploadMessage messageType="default" color="#999">
          Arraste arquivos aqui...
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
        Solte os arquivos aqui
      </UploadMessage>
    );
  };

  const Preview = files.map((file: any) => (
    <div>
      <Image src={file.preview} />
    </div>
  ));

  return (
    <Container>
      {files && (
        <FilesPreview>
          {Preview ? (
            Preview
          ) : (
            <img src={image} alt="imagem" width={160} height={160} />
          )}
        </FilesPreview>
      )}

      <DragContainer {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        {renderDragMessage(isDragActive, isDragReject)}
      </DragContainer>
    </Container>
  );
};
export default CustomDropzone;
