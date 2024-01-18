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

export interface HeaderProps {
  text: string;
}

export interface UserForm {
  name: string;
  phone: string;
  birthDate: string;
  email: string;
  role: string;
  password: string;
}

export interface ErrorForm {
  errorName: boolean;
  errorPhone: boolean;
  errorBirthDate: boolean;
  errorEmail: boolean;
  errorPassword: boolean;
}
