import React from "react";
import { ActivityIndicator } from "react-native";
import {
  CenteredContainer,
  InputText,
  InputField,
  ButtonWrapper,
  ButtonText,
  CaptionText,
} from "../styles/styles";
import { KeyboardTypeOptions } from "react-native";

export interface TextFieldProps {
  title: string;
  type?: KeyboardTypeOptions;
  isPassword: boolean;
  onChange: (text: string) => void;
  error?: boolean;
}

export interface ButtonProps {
  body: string;
  onPress?: () => void;
  loading: boolean;
}

function TextField({
  title,
  type,
  isPassword,
  onChange,
  error = false,
}: TextFieldProps): React.JSX.Element {
  return (
    <CenteredContainer>
      <InputText>{title}</InputText>
      <InputField
        keyboardType={type}
        autoCapitalize="none"
        secureTextEntry={isPassword}
        onChangeText={onChange}
        error={error}
      />
      {error && <CaptionText>Este campo é obrigatório.</CaptionText>}
    </CenteredContainer>
  );
}

function Button({ body, onPress, loading }: ButtonProps): React.JSX.Element {
  return (
    <CenteredContainer>
      <ButtonWrapper onPress={onPress} disabled={loading} loading={loading}>
        {loading ? (
          <ActivityIndicator color="black" size="small" />
        ) : (
          <ButtonText>{body}</ButtonText>
        )}
      </ButtonWrapper>
    </CenteredContainer>
  );
}
export { TextField, Button };
