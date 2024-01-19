import React, { useState } from "react";
import { isValidEmail, isValidPassword } from "../validation/validation";
import { Alert } from "react-native";
import { TextField, Button } from "./login-screen";
import { ApolloError, useMutation } from "@apollo/client";
import { LOGIN } from "../apollo/mutation";
import { LoginData } from "../interfaces/mutation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Header } from "./header";
import { Spacing } from "../styles/styles";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMutation] = useMutation<LoginData>(LOGIN);
  const navigation = useNavigation();
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateLogin = async () => {
    setErrorEmail(false);
    setErrorPassword(false);

    if (!isValidEmail(email)) {
      Alert.alert("Erro", "Por favor, insira um email válido.");
      setErrorEmail(true);
      return;
    }

    if (!isValidPassword(password)) {
      Alert.alert(
        "Erro",
        "Por favor, a senha deve não ser vazia, deve ter pelo menos 7 caracteres, pelo menos uma letra e um dígito.",
      );
      setErrorPassword(true);
      return;
    }

    try {
      setLoading(true);
      const response = await loginMutation({
        variables: { data: { email: email, password: password } },
      });

      if (response.data) {
        await AsyncStorage.setItem("userToken", response.data.login.token);

        navigation.navigate("UserListScreen" as never);
      }

      Alert.alert("Sucesso!", `Bem-vindo, ${email}!`);
    } catch (error) {
      console.log(error);

      if (error) {
        const errorApollo = error as ApolloError;
        Alert.alert(
          "Erro",
          `Ocorreu um erro durante o login: ${errorApollo.message}`,
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header text="Bem-vindo(a) à Taqtile" />

      <TextField
        title="E-mail"
        type="email-address"
        isPassword={false}
        onChange={setEmail}
        error={errorEmail}
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

      <Button body={"Entrar"} onPress={validateLogin} loading={loading} />
    </>
  );
};
