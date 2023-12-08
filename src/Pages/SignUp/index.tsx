import React from "react";
import CustomInput from "../../Components/Input";
import CustomButton from "../../Components/Button";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { ContextSignUp } from "../../Contexts/AuthContext/middlewares";
import {
  Container,
  InputsContainer,
  Title,
  Resume,
  ErrorMessage,
} from "./styles";

const loginSchema = Yup.object().shape({
  name: Yup.string().required("Nome é um campo obrigatório"),
  surname: Yup.string().required("Sobrenome é um campo obrigatório"),
  email: Yup.string().required("Email é um campo obrigatório").email(),
  password: Yup.string()
    .required("Password é um campo obrigatório")
    .min(6, "Password em formato inválido"),
});

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Formik
        validationSchema={loginSchema}
        initialValues={{ name: "", surname: "", email: "", password: "" }}
        onSubmit={async ({ name, surname, email, password }) => {
          try {
            await ContextSignUp(name, surname, email, password);
            setTimeout(() => {
              navigate("/dashboard");
            }, 2000);
          } catch (err) {
            return err;
          }
        }}
      >
        {({ values, errors, touched, handleSubmit, handleChange }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Title>Crie uma Conta</Title>
            <Resume>Por-favor forneça seus dados</Resume>
            <InputsContainer>
              <CustomInput
                customMarginTop="4px"
                type="name"
                name="name"
                onChange={handleChange}
                value={values.name}
                placeHolder="Digite seu nome"
                id="name"
              />

              <ErrorMessage>
                {errors.name != null && touched.name != null && errors.name}
              </ErrorMessage>
              <CustomInput
                customMarginTop="4px"
                type="surname"
                name="surname"
                onChange={handleChange}
                value={values.surname}
                placeHolder="Digite seu sobrenome"
                id="surname"
              />

              <ErrorMessage>
                {errors.surname != null &&
                  touched.surname != null &&
                  errors.surname}
              </ErrorMessage>

              <CustomInput
                customMarginTop="4px"
                type="email"
                name="email"
                onChange={handleChange}
                value={values.email}
                placeHolder="Digite seu email@..."
                id="email"
              />

              <ErrorMessage>
                {errors.email != null && touched.email != null && errors.email}
              </ErrorMessage>
              <CustomInput
                customMarginTop="4px"
                type="password"
                name="password"
                onChange={handleChange}
                value={values.password}
                placeHolder="Digite sua senha..."
                id="password"
              />

              <ErrorMessage>
                {errors.password != null &&
                  touched.password != null &&
                  errors.password}
              </ErrorMessage>

              <CustomButton
                customBackgroundColor="#04D361"
                type="submit"
                marginTop="16px"
                opacity={0.8}
                onClick={handleSubmit}
              >
                Criar conta
              </CustomButton>
            </InputsContainer>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default SignUp;
