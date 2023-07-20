/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from "react";

import { Container, Title, InputContainer, LabelContainer } from "./styles";
import Input from "../../Components/Input";
import Button from "../../Components/Button";

const ForgotPassword: React.FC = () => {
  const [mailValue, setMailValue] = useState("");

  const onChangeMail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMailValue(e.target.value);
  };

  const ClickedButton = async () => {
    return true;
  };
  return (
    <Container>
      <Title>Esqueci a Senha</Title>

      <InputContainer>
        <LabelContainer>
          <h5>Digite seu email</h5>
          <p>*</p>
        </LabelContainer>
        <Input
          width="349px"
          placeHolder="Digite o seu email"
          type="email"
          onChange={onChangeMail}
          value={mailValue}
        />
      </InputContainer>

      <Button
        onClick={ClickedButton}
        customBackgroundColor="#FDC886"
        width="355px"
      >
        Esqueci minha senha
      </Button>
    </Container>
  );
};

export default ForgotPassword;
