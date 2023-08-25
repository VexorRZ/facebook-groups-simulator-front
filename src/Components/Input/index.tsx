import React from "react";

import { StylezedInput } from "./styles";

interface IInputProps {
  type: string;
  value: string;
  placeHolder: string;
  width?: string;
  name?: string;
  id?: string;
  customMarginTop?: string;
  children?: React.ReactNode;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput = ({
  type,
  value,
  placeHolder,
  width,
  name,
  id,
  customMarginTop,
  children,
  onChange,
}: IInputProps) => {
  return (
    <StylezedInput
      width={width}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeHolder}
      name={name}
      id={id}
      customMarginTop={customMarginTop}
    >
      {children}
    </StylezedInput>
  );
};

export default CustomInput;
