import React from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

const BackButtonWrapper = styled.TouchableOpacity`
  position: absolute;
  top: 16px;
  left: 16px;
  padding: 10px;
`;

const BackButtonText = styled.Text`
  color: gray;
  font-size: 16px;
`;

export const BackButton = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.goBack();
  };

  return (
    <BackButtonWrapper onPress={handlePress}>
      <BackButtonText>Voltar</BackButtonText>
    </BackButtonWrapper>
  );
};
