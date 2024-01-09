/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from "react";
import { Alert, SafeAreaView, View, Text, StyleSheet } from "react-native";
import { LoginButton, TextField } from "./components/loginscreen";
import { LOGIN } from "./apollo/mutation";
import { useMutation } from "@apollo/client";
import { LoginData } from "./interfaces/mutation";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMutation, { error, data }] = useMutation<LoginData>(LOGIN);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleLogin = async () => {
      if (isLoggedIn) {
        navigation.navigate("BlankPage" as never);
      }
    };

    handleLogin();
  }, [isLoggedIn, navigation]);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password: string) => {
    return (
      password.length >= 7 && /[a-zA-Z]/.test(password) && /\d/.test(password)
    );
  };

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

        const userToken = await AsyncStorage.getItem("userToken");

        setIsLoggedIn(true);

        console.log(userToken);
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
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.center}>
        <Text style={styles.header}>Bem vindo(a) à Taqtile!</Text>
      </View>

      <TextField title="E-mail" onChange={setEmail} />

      <TextField title="Senha" type="password" onChange={setPassword} />

      <LoginButton
        body={loading ? "Loading..." : "Entrar"}
        onPress={validateLogin}
        loading={loading}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    marginTop: 80,
    flex: 1,
  },
  center: {
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
    flex: 0.3,
    paddingHorizontal: 24,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
  },
});

export default App;
