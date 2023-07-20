import React from "react";

import { ButtonStyles } from "./styles";

interface IbuttonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  customBackgroundColor?: string;
  width?: string;
  height?: string;
  type?: "submit" | "reset" | "button" | undefined;
  marginTop?: string;
  opacity?: number;
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
}: IbuttonProps) => {
  return (
    <ButtonStyles
      width={width}
      height={height}
      onClick={onClick}
      customBackgroundColor={customBackgroundColor}
      type={type}
      marginTop={marginTop}
      opacity={opacity}
    >
      {children}
    </ButtonStyles>
  );
};

export default CustomButton;
