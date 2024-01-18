import React from "react";
import { HeaderContainer, HeaderText } from "../styles/styles";
import { HeaderProps } from "../interfaces/component";

export const Header: React.FC<HeaderProps> = ({ text }) => {
  return (
    <HeaderContainer>
      <HeaderText>{text}</HeaderText>
    </HeaderContainer>
  );
};
