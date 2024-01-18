import React from "react";
import { ActivityIndicator } from "react-native";
import { TextFieldProps, ButtonProps } from "../interfaces/component";
import {
  InputWrapper,
  InputText,
  InputField,
  ButtonWrapper,
  ButtonText,
  CaptionText,
} from "../styles/styles";

function TextField({
  title,
  type,
  isPassword,
  onChange,
  error = false,
}: TextFieldProps): React.JSX.Element {
  return (
    <InputWrapper>
      <InputText>{title}</InputText>
      <InputField
        keyboardType={type}
        autoCapitalize="none"
        secureTextEntry={isPassword}
        onChangeText={onChange}
        error={error}
      />
      {error && <CaptionText>Este campo é obrigatório.</CaptionText>}
    </InputWrapper>
  );
}

function Button({ body, onPress, loading }: ButtonProps): React.JSX.Element {
  return (
    <InputWrapper>
      <ButtonWrapper onPress={onPress} disabled={loading} loading={loading}>
        {loading ? (
          <ActivityIndicator color="black" size="small" />
        ) : (
          <ButtonText>{body}</ButtonText>
        )}
      </ButtonWrapper>
    </InputWrapper>
  );
}
export { TextField, Button };
