/* eslint-disable react/no-unknown-property */
/* eslint-disable multiline-ternary */
import React, { useState, useCallback, useEffect } from "react";
import { type AxiosResponse } from "axios";
import api from "../../services/api";
import { type Groups } from "../../services/interfaces";
import { useNavigate } from "react-router-dom";
import TopBar from "../../Components/TopBar";
import Dropzone from "../../Components/DropZone";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LockIcon from "@mui/icons-material/Lock";
import PublicIcon from "@mui/icons-material/Public";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import {
  Container,
  GroupName,
  GroupType,
  Header,
  Footer,
  Button,
  ImageContainer,
  CardOptions,
  Option,
  OptionText,
} from "./styles";

const CreateGroup = () => {
  const [image, setImage] = useState<File[]>([]);
  const [option, setOption] = useState<boolean>();
  const [cardOptionVisibility, setcardOptionVisibility] =
    useState<boolean>(false);
  const [groupName, setGroupName] = useState<string>("");
  const [status] = useState({
    type: "",
    mensagem: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    console.log("option:", option);
    localStorage.getItem("@token");
  });

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

  const SelectGroupPrivacy = () => {
    if (option === undefined) {
      return (
        <>
          <div>Escolher privacidade</div>
          <ArrowDropDownIcon />
        </>
      );
    } else if (option) {
      return (
        <>
          <div>Escolher privacidade</div>
          <PublicIcon />
          <ArrowDropDownIcon />
        </>
      );
    } else if (!option) {
      <>
        <div>Escolher privacidade</div>
        <LockIcon />
        <ArrowDropDownIcon />
      </>;
    }
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
            previewMessage="Selecione a foto do seu grupo..."
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
          <GroupType
            onClick={() => {
              setcardOptionVisibility(true);
            }}
          >
            {SelectGroupPrivacy()}
            {cardOptionVisibility && (
              <CardOptions>
                <Option>
                  <OptionText>
                    <PublicIcon /> Púbblico
                  </OptionText>
                </Option>
                <Option>
                  <OptionText>
                    <LockIcon /> Privado
                  </OptionText>
                </Option>
              </CardOptions>
            )}
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
