/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/no-floating-promises */

import React from "react";
import CustomInput from "../../Components/Input";
import CustomButton from "../../Components/Button";
import { Formik, Form } from "formik";
import IconEncapsulator from "../../Components/IconEncapsulator";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import InstagramIcon from "@mui/icons-material/Instagram";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import ToastContainer from "../../Components/ToastContainer";
import { ToastError } from "../../Components/ToastContainer/ToastMessages";

import {
  Container,
  StyledLink,
  InputsContainer,
  Title,
  Resume,
  IconsContainer,
  ErrorMessage,
} from "./styles";

const Login = () => {
  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email é um campo obrigatório")
      .email("Email em formato inválido"),
    password: Yup.string()
      .required("Password é um campo obrigatório")
      .min(6, "Password em formato inválido"),
  });

  const navigate = useNavigate();

  const { dispatch, asyncLoginFn } = useAuth();

  const nagivateToSignUp = () => {
    navigate("/sign-up");
  };

  const HandleSigin = async (
    email: string,
    password: string,
    dispatch: any
  ) => {
    try {
      await asyncLoginFn(email, password, dispatch);
    } catch (err) {
      ToastError("ocorreu um erro ao tentar realizar o login");
      return err;
    }
  };

  return (
    <>
      <Container>
        <Formik
          validationSchema={loginSchema}
          initialValues={{ email: "", password: "", dispatch }}
          onSubmit={async ({ email, password, dispatch }) => {
            try {
              await HandleSigin(email, password, dispatch);
              navigate("/dashboard");
            } catch (err) {
              return err;
            }
          }}
        >
          {({ values, errors, touched, handleSubmit, handleChange }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Title>Bem Vindo</Title>
              <Resume>Por-favor forneça seu email e senha</Resume>
              <InputsContainer>
                <CustomInput
                  customMarginTop="8px"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                  placeHolder="Digite seu email@..."
                  id="email"
                />

                <ErrorMessage>
                  {errors.email != null &&
                    touched.email != null &&
                    errors.email}
                </ErrorMessage>

                <CustomInput
                  customMarginTop="8px"
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
                  customBackgroundColor="#04D361"
                  type="submit"
                  marginTop="24px"
                  opacity={0.8}
                  onClick={handleSubmit}
                >
                  Login
                </CustomButton>
                <ToastContainer />
                <CustomButton
                  customBackgroundColor="#4863F7"
                  type="submit"
                  marginTop="4px"
                  opacity={0.8}
                  onClick={nagivateToSignUp}
                >
                  Cadastrar-se
                </CustomButton>

                <StyledLink to="/forgot-password">
                  Esqueceu sua senha?
                </StyledLink>
              </InputsContainer>
            </Form>
          )}
        </Formik>

        <div>-ou faça login com-</div>
        <IconsContainer>
          <IconEncapsulator>
            <FacebookIcon
              style={{
                color: "#3A559F",
              }}
            />
          </IconEncapsulator>
          <IconEncapsulator>
            <GoogleIcon
              style={{
                color: "#FF3A00",
              }}
            />
          </IconEncapsulator>
          <IconEncapsulator>
            <InstagramIcon
              style={{
                color: "#DC4460",
              }}
            />
          </IconEncapsulator>
        </IconsContainer>
      </Container>
    </>
  );
};

export default Login;
