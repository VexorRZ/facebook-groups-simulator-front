import React, { useState, useCallback, useEffect } from "react";
// import { closeEsc } from "../../utils/HandlesHelpers";
import CustomInput from "../Input";
import CustomButton from "../Button";
import {
  Container,
  CloseIconDiv,
  CloseIcon,
  CustomSelect,
  CustomOption,
} from "./styles";

interface IcreateTopic {
  onClick?: () => void;
  closeEsc?: () => void;
}

const CreateTopic = ({ onClick }: IcreateTopic) => {
  const [topicName, setTopicName] = useState<string>("");
  const [option, setOption] = useState<string>("notPrivate");

  useEffect(() => {}, []);

  const changeGroupname = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      event.preventDefault();
      setTopicName(event.currentTarget.value);
    },
    [topicName]
  );

  const selectChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      event.preventDefault();
      const value = event.target.value;
      setOption(value);
    },
    [option]
  );
  return (
    <Container>
      <CloseIconDiv>
        <CloseIcon onClick={onClick} />
      </CloseIconDiv>
      <CustomInput
        type="text"
        value={topicName}
        placeHolder="Digite o nome do tópico"
        onChange={changeGroupname}
      />
      <CustomSelect name="selectGroup" onChange={selectChange}>
        <CustomOption selected disabled>
          Escolha uma opção
        </CustomOption>
        <CustomOption value={option}>aberto </CustomOption>
        <CustomOption value={option}>fechado </CustomOption>
      </CustomSelect>
      <CustomButton
        customBackgroundColor="#373e4a"
        opacity={0.7}
        customColor="hsla(150, 14%, 97%, 1)"
        height="64px"
        width="180px"
      >
        Criar
      </CustomButton>
    </Container>
  );
};

export default CreateTopic;
