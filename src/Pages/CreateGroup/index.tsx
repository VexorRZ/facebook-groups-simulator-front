/* eslint-disable react/no-unknown-property */
/* eslint-disable multiline-ternary */
import React, { useState, useCallback, useEffect } from "react";
import useGroups from "../../Hooks/useGroups";
// import { type Groups } from "../../services/interfaces";
import { useNavigate } from "react-router-dom";
import TopBar from "../../Components/TopBar";
import Dropzone from "../../Components/DropZone";
import LockIcon from "@mui/icons-material/Lock";
import PublicIcon from "@mui/icons-material/Public";
import { styled } from "@mui/material/styles";
import { useRadioGroup } from "@mui/material/RadioGroup";
import FormControlLabel, {
  type FormControlLabelProps,
} from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

import {
  Container,
  GroupName,
  Header,
  Footer,
  Button,
  ImageContainer,
  CardOptions,
  StyledRadioGroup,
  GroupPrivacy,
} from "./styles";

interface StyledFormControlLabelProps extends FormControlLabelProps {
  checked: boolean;
}

const StyledFormControlLabel = styled((props: StyledFormControlLabelProps) => (
  <FormControlLabel {...props} />
))(({ theme, checked }) => ({
  ".MuiFormControlLabel-label": checked && {
    color: theme.palette.primary.main,
  },
}));

function MyFormControlLabel(props: FormControlLabelProps) {
  const radioGroup = useRadioGroup();

  let checked = false;

  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }

  return <StyledFormControlLabel checked={checked} {...props} />;
}

const CreateGroup = () => {
  const [image, setImage] = useState<File[]>([]);
  const [option, setOption] = useState<boolean>(false);
  const [groupName, setGroupName] = useState<string>("");
  const [groupDescription, setGroupDescription] = useState<string>("");
  const [status] = useState({
    type: "",
    mensagem: "",
  });

  const { asyncCreateGroup } = useGroups();

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

  const changeDescription = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      event.preventDefault();
      setGroupDescription(event.currentTarget.value);
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
    data.append("is_private", JSON.stringify(option));
    data.append("name", groupName);
    data.append("description", groupDescription);
    data.append("file", image[0]);

    try {
      const res = await asyncCreateGroup(data);
      navigateToCreatedTopic(res.id);
    } catch (err) {
      alert("não deu");
    }
  };

  const navigateToCreatedTopic = (groupId: string) => {
    navigate(`/group/${groupId}`);
  };

  const SelectGroupPrivacy = () => {
    if (!option) {
      return (
        <GroupPrivacy>
          Grupo público <PublicIcon />
        </GroupPrivacy>
      );
    } else {
      return (
        <GroupPrivacy>
          Grupo privado <LockIcon />
        </GroupPrivacy>
      );
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

          {SelectGroupPrivacy()}

          <CardOptions>
            <StyledRadioGroup
              radioActive={true}
              name="use-radio-group"
              defaultValue="first"
            >
              <div className="radio-options">
                <PublicIcon />
                <MyFormControlLabel
                  value="first"
                  label="público"
                  control={
                    <Radio
                      onClick={() => {
                        setOption(false);
                      }}
                    />
                  }
                />
                <span className="option-description">
                  (Qualquer pessoa poderá visualizar o conteúdo do grupo)
                </span>
              </div>
              <div className="radio-options">
                <LockIcon />
                <MyFormControlLabel
                  value="second"
                  label="privado"
                  control={
                    <Radio
                      onClick={() => {
                        setOption(true);
                      }}
                    />
                  }
                />

                <span className="option-description">
                  (Somente membros poderão ver o conteúdo do grupo)
                </span>
              </div>
            </StyledRadioGroup>
          </CardOptions>

          <div>Faça uma breve descrição do seu grupo</div>
          <GroupName
            height="100px"
            maxLength={100}
            value={groupDescription}
            onChange={changeDescription}
          />
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
