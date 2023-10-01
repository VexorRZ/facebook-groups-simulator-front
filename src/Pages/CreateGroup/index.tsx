/* eslint-disable react/no-unknown-property */
/* eslint-disable multiline-ternary */
import React, { useState } from "react";

import Dropzone from "../../Components/DropZone";

import {
  Container,
  GroupName,
  GroupType,
  StyledOption,
  Header,
  Footer,
  Button,
  ImageContainer,
  GroupAvatar,
  DropContainer,
  UploadMessage,
} from "./styles";

const CreateGroup = () => {
  const [image, setImage] = useState<any>([]);

  const [status] = useState({
    type: "",
    mensagem: "",
  });

  return (
    <Container>
      <ImageContainer>
        {status.type === "success" ? (
          <p style={{ color: "green" }}>{status.mensagem}</p>
        ) : (
          ""
        )}
        {status.type === "error" ? (
          <p style={{ color: "#ff0000" }}>{status.mensagem}</p>
        ) : (
          ""
        )}
      </ImageContainer>
      <Header>
        <Dropzone
          files={image}
          onDrop={(acceptedImage) => {
            setImage(
              acceptedImage.map((file) =>
                Object.assign(file, {
                  preview: URL.createObjectURL(file),
                })
              )
            );
          }}
        />

        <div>nome do grupo</div>
        <GroupName maxLength={40} />
        <div>tipo de grupo</div>
        <GroupType name="selectedFruit">
          <StyledOption value="apple">privado</StyledOption>
          <StyledOption value="banana">público</StyledOption>
        </GroupType>
        <div>descrição</div>
        <GroupName height="100px" maxLength={100} />
      </Header>
      <Footer>
        <Button width="180px" height="60px" marginTop="14px">
          Criar grupo
        </Button>
      </Footer>
    </Container>
  );
};

export default CreateGroup;
