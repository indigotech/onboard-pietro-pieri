import React, { useState } from "react";
import { Alert } from "react-native";
import { RadioButton } from "react-native-paper";
import { ApolloError, useMutation } from "@apollo/client";
import { CREATE_USER } from "../apollo/mutation";
import { formValidation } from "../validation/validation";
import { User } from "../interfaces/mutation";
import { TextField, Button } from "./login-screen";
import {
  FormContainer,
  RoleContainer,
  RoleText,
  InputText,
  CenteredContainer,
  ButtonContainer,
  Spacing,
} from "../styles/styles";
import { useNavigation } from "@react-navigation/native";
import { BackButton } from "./back-button";
import { Header } from "./header";
import { UserForm as FormUser } from "../validation/validation";

export const UserForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [createUser] = useMutation<User>(CREATE_USER);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [errorName, setErrorName] = useState(false);
  const [errorEmail, seterrorEmail] = useState(false);
  const [errorPhone, seterrorPhone] = useState(false);
  const [errorBirthDate, seterrorBirthDate] = useState(false);
  const [errorPassword, seterrorPassword] = useState(false);

  const handleFormSubmit = async () => {
    const userData: FormUser = {
      name,
      email,
      phone,
      birthDate,
      password,
      role,
    };

    const formValidate = formValidation(userData);

    if (!formValidate.isValid) {
      seterrorBirthDate(formValidate.error.errorBirthDate);
      seterrorEmail(formValidate.error.errorEmail);
      setErrorName(formValidate.error.errorName);
      seterrorPhone(formValidate.error.errorPhone);
      seterrorPassword(formValidate.error.errorPassword);
    } else {
      try {
        setLoading(true);
        const response = await createUser({
          variables: { data: userData },
        });

        if (response.data) {
          Alert.alert("Sucesso", "Usuário cadastrado", [
            {
              onPress: () => {
                navigation.goBack();
              },
            },
          ]);
        }

        if (response.errors) {
          Alert.alert("Erro", response.errors.toString());
        }
      } catch (error) {
        if (error) {
          const errorApollo = error as ApolloError;
          Alert.alert("Erro", errorApollo.message);
        }
      }
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      <Header text="Criar usuário"></Header>

      <BackButton />

      <TextField
        title="Nome"
        isPassword={false}
        type="email-address"
        onChange={setName}
        error={errorName}
      />

      <Spacing />

      <TextField
        title="Email"
        type="email-address"
        isPassword={false}
        onChange={setEmail}
        error={errorEmail}
      />

      <Spacing />

      <TextField
        title="Telefone"
        type="phone-pad"
        isPassword={false}
        onChange={setPhone}
        error={errorPhone}
      />

      <Spacing />

      <TextField
        title="Data de nascimento - (YYYY-MM-DD)"
        type="numeric"
        onChange={setBirthDate}
        isPassword={false}
        error={errorBirthDate}
      />

      <Spacing />

      <TextField
        title="Senha"
        type="default"
        isPassword={true}
        onChange={setPassword}
        error={errorPassword}
      />

      <Spacing />

      <CenteredContainer>
        <InputText>Permissão:</InputText>
        <RoleContainer>
          <RoleText>Usuário</RoleText>
          <RadioButton
            value="user"
            status={role === "user" ? "checked" : "unchecked"}
            onPress={() => setRole("user")}
          />
          <RoleText>Administrador</RoleText>
          <RadioButton
            value="admin"
            status={role === "admin" ? "checked" : "unchecked"}
            onPress={() => setRole("admin")}
          />
        </RoleContainer>
      </CenteredContainer>

      <ButtonContainer>
        <Button body="Enviar" loading={loading} onPress={handleFormSubmit} />
      </ButtonContainer>
    </FormContainer>
  );
};
