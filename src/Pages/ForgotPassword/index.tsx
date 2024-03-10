/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState, useCallback } from "react";
import useAuth from "../../Hooks/useAuth";
import { Container, Title, InputContainer, LabelContainer } from "./styles";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import { useNavigate } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  const [email, setMail] = useState("");

  const navigate = useNavigate();

  const changeMail = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      e.preventDefault();
      setMail(e.currentTarget.value);
    },
    [email]
  );

  const { recoverPassword } = useAuth();

  async function tryToRecoverPassword() {
    try {
      recoverPassword(email);
      setTimeout(() => {
        return navigate("/");
      }, 2000);
    } catch (err) {
      return err;
    }
  }
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
          onChange={changeMail}
          value={email}
        />
      </InputContainer>

      <Button
        onClick={tryToRecoverPassword}
        marginTop="3px"
        customBackgroundColor="#04D361"
        width="355px"
      >
        Esqueci minha senha
      </Button>
    </Container>
  );
};

export default ForgotPassword;
