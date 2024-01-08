/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from "react";
import { Alert, SafeAreaView, View, Text, StyleSheet } from "react-native";
import {LoginButton, TextField} from './components/login-screen'

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password: string) => {
    return (
      password.length >= 7 && /[a-zA-Z]/.test(password) && /\d/.test(password)
    );
  };

  const validateLogin = () => {
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

    Alert.alert("Sucesso!", `Bem-vindo, ${email}!`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.center}>
        <Text style={styles.header}>Bem vindo(a) à Taqtile!</Text>
      </View>

      <TextField title="E-mail" onChange={setEmail} />

      <TextField title="Senha" type="password" onChange={setPassword} />

      <LoginButton body="Entrar" onPress={validateLogin} />
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
