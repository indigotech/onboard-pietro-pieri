import React from "react";
import { HeaderContainer, HeaderText, Spacing } from "../styles/styles";

export interface HeaderProps {
  text: string;
}

export const Header: React.FC<HeaderProps> = ({ text }) => {
  return (
    <>
      <HeaderContainer>
        <HeaderText>{text}</HeaderText>
      </HeaderContainer>
      <Spacing />
    </>
  );
};
