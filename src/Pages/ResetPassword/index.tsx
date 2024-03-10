import React, { useEffect, useState, useCallback } from "react";
import useAuth from "../../Hooks/useAuth";
import CustomInput from "../../Components/Input";
import CustomButton from "../../Components/Button";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Container, ErrorMessage } from "./styles";

const ResetPassword = () => {
  const { forgotPassword, resetPassword } = useAuth();
  const params = useParams();
  const { token } = params;

  const navigate = useNavigate();

  const NewpasswordSchema = Yup.object().shape({
    newPassword: Yup.string().required("Password is required"),
    NewPasswordConfirmation: Yup.string().oneOf(
      [Yup.ref("password")],
      "Passwords must match"
    ),
  });

  async function forgot_password() {
    await forgotPassword(String(token));
  }

  const HandleResetPassword = async (password: string, token: string) => {
    try {
      await resetPassword(password, token);
      setTimeout(() => {
        return navigate("/");
      }, 2000);
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    forgot_password();
  }, []);

  return (
    <Container>
      <Formik
        initialValues={{ newPassword: "", NewPasswordConfirmation: "", token }}
        onSubmit={async ({ newPassword, token }) => {
          try {
            await HandleResetPassword(newPassword, String(token));
          } catch (err) {
            return err;
          }
        }}
      >
        {({ values, errors, touched, handleSubmit, handleChange }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <CustomInput
              customMarginTop="8px"
              type="password"
              name="newPassword"
              onChange={handleChange}
              value={values.newPassword}
              placeHolder="Digite sua nova senha..."
              id="newPassword"
            />
            <ErrorMessage>
              {errors.newPassword != null &&
                touched.newPassword != null &&
                errors.newPassword}
            </ErrorMessage>

            <CustomInput
              customMarginTop="8px"
              type="password"
              name="NewPasswordConfirmation"
              onChange={handleChange}
              value={values.NewPasswordConfirmation}
              placeHolder="Confirme sua nova senha..."
            />
            <ErrorMessage>
              {errors.NewPasswordConfirmation != null &&
                touched.NewPasswordConfirmation != null &&
                errors.NewPasswordConfirmation}
            </ErrorMessage>
            <CustomButton
              customBackgroundColor="#04D361"
              type="submit"
              marginTop="24px"
              opacity={0.8}
              onClick={handleSubmit}
            >
              Alterar senha
            </CustomButton>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default ResetPassword;
