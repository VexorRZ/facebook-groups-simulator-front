import React from "react";
import CustomInput from "../../Components/Input";
import CustomButton from "../../Components/Button";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {
  Container,
  InputsContainer,
  Title,
  Resume,
  ErrorMessage,
} from "./styles";

const loginSchema = Yup.object().shape({
  firstName: Yup.string().required("Nome é um campo obrigatório"),
  surname: Yup.string().required("Email é um campo obrigatório"),
  email: Yup.string()
    .required("Email é um campo obrigatório")
    .email("Email em formato inválido"),
  password: Yup.string()
    .required("Password é um campo obrigatório")
    .min(8, "Password em formato inválido"),
});

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Formik
        validationSchema={loginSchema}
        initialValues={{ firstName: "", surname: "", email: "", password: "" }}
        onSubmit={() => {
          alert("login realizado com sucesso");
          navigate("/dashboard");
        }}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Title>Crie uma Conta</Title>
            <Resume>Por-favor forneça seus dados</Resume>
            <InputsContainer>
              <CustomInput
                customMarginTop="4px"
                type="name"
                name="name"
                onChange={handleChange}
                value={values.firstName}
                placeHolder="Digite seu nome"
                id="name"
              />

              <ErrorMessage>
                {errors.firstName != null &&
                  touched.email != null &&
                  errors.email}
              </ErrorMessage>
              <CustomInput
                customMarginTop="4px"
                type="email"
                name="email"
                onChange={handleChange}
                value={values.surname}
                placeHolder="Digite seu sobrenome"
                id="surname"
              />

              <ErrorMessage>
                {errors.surname != null &&
                  touched.email != null &&
                  errors.email}
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
              />

              <ErrorMessage>
                {errors.password != null &&
                  touched.password != null &&
                  errors.password}
              </ErrorMessage>

              <CustomButton
                customBackgroundColor="#fdc886"
                type="submit"
                marginTop="16px"
                opacity={0.8}
                onClick={() => {}}
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
