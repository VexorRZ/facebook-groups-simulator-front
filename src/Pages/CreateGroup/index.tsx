/* eslint-disable react/no-unknown-property */
/* eslint-disable multiline-ternary */
import React, { useState, useCallback, useEffect } from "react";
import { type AxiosResponse } from "axios";
// import Dropzone from "../../Components/DropZone";
import api from "../../services/api";
import { type Groups } from "../../services/interfaces";
import { useNavigate } from "react-router-dom";
import TopBar from "../../Components/TopBar";
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
} from "./styles";

const CreateGroup = () => {
  const [image, setImage] = useState<File[]>([]);
  const [option, setOption] = useState<string>("notPrivate");
  const [groupName, setGroupName] = useState<string>("");
  const [status] = useState({
    type: "",
    mensagem: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.getItem("@token");
  });

  const selectChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      event.preventDefault();
      const value = event.target.value;
      setOption(value);
    },
    [option]
  );

  const changeGroupname = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      event.preventDefault();
      setGroupName(event.currentTarget.value);
    },
    [groupName]
  );

  const createGroup = async (event: any) => {
    event.preventDefault();
    const token = localStorage.getItem("@token");

    if (!token) {
      throw new Error("Erro inesperado, token não fornecido");
    }

    const data = new FormData();
    data.append("is_private", JSON.stringify(false));
    data.append("name", groupName);
    data.append("file", image[0]);

    try {
      const res: AxiosResponse<Groups> = await api.post<
        Groups,
        AxiosResponse<Groups>
      >(`groups`, data);

      navigateToCreatedTopic(res.data.id);
    } catch (err) {
      alert("não deu");
    }
  };

  const navigateToCreatedTopic = (groupId: number) => {
    navigate(`/group/${Number(groupId)}`);
  };

  return (
    <>
      <TopBar />
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

          <div>Forneça um nome ao seu grupo</div>
          <GroupName
            maxLength={40}
            value={groupName}
            onChange={changeGroupname}
          />
          <div>tipo de grupo</div>
          <GroupType name="selectGroup" onChange={selectChange}>
            <StyledOption selected disabled>
              Escolha uma opção
            </StyledOption>
            <StyledOption value="private">privado</StyledOption>
            <StyledOption value="notPrivate">público</StyledOption>
          </GroupType>
          <div>Faça uma breve descrição do seu grupo</div>
          <GroupName height="100px" maxLength={100} />
        </Header>
        <Footer>
          <Button
            width="180px"
            height="60px"
            marginTop="14px"
            onClick={createGroup}
          >
            Criar grupo
          </Button>
        </Footer>
      </Container>
    </>
  );
};

export default CreateGroup;
