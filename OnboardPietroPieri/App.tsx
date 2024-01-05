/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet
} from 'react-native';
import {LoginButton, TextField} from './components/loginscreen'

const App = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.center}>
        <Text style={styles.header}>Bem vindo(a) à Taqtile!</Text>
      </View>

      <TextField title="E-mail" />

      <TextField title="Senha" type="password"/>

      <LoginButton body="Entrar" />

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
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.3,
    paddingHorizontal: 24,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
});


export default App;