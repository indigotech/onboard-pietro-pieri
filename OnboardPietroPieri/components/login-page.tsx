import React, { useState } from "react";
import { isValidEmail, isValidPassword } from "../validation/validation";
import { View, Alert } from "react-native";
import { TextField, Button } from "./login-screen";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../apollo/mutation";
import { LoginData } from "../interfaces/mutation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Header } from "./header";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMutation, { error, data }] = useMutation<LoginData>(LOGIN);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const validateLogin = async () => {
    if (!isValidEmail(email)) {
      Alert.alert("Erro", "Por favor, insira um email válido.");
      return;
    }

    if (!isValidPassword(password)) {
      Alert.alert(
        "Erro",
        "Por favor, a senha deve não ser vazia, deve ter pelo menos 7 caracteres, pelo menos uma letra e um dígito.",
      );
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

      Alert.alert("Erro", "Ocorreu um erro durante o login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <TextField title="E-mail" onChange={setEmail} />

      <TextField title="Senha" type="password" onChange={setPassword} />

      <Button body={"Entrar"} onPress={validateLogin} loading={loading} />
    </>
  );
};
