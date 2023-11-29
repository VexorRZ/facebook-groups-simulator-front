import React from "react";

import { ButtonStyles } from "./styles";

interface IbuttonProps {
  children?: React.ReactNode;
  onClick?: (param?: any) => void;
  customBackgroundColor?: string;
  width?: string;
  height?: string;
  type?: "submit" | "reset" | "button" | undefined;
  marginTop?: string;
  opacity?: number;
  customColor?: string;
  disabled?: boolean;
}

const CustomButton = ({
  children,
  onClick,
  customBackgroundColor,
  width,
  height,
  type,
  marginTop,
  opacity,
  customColor,
  disabled,
}: IbuttonProps) => {
  return (
    <ButtonStyles
      disabled={disabled}
      width={width}
      height={height}
      onClick={onClick}
      customBackgroundColor={customBackgroundColor}
      type={type}
      marginTop={marginTop}
      opacity={opacity}
      customColor={customColor}
    >
      {children}
    </ButtonStyles>
  );
};

export default CustomButton;
