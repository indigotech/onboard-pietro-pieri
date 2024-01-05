/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {PropsWithChildren} from "react";
import {
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  View,
  Text,
  StyleSheet
} from 'react-native';

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
  textBemVindo: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  inputText: {
    color: 'black',
    fontWeight: 'normal',
    marginLeft: 40,
    top: 28,
  },
  input: {
    marginLeft: 40,
    marginTop: 30,
    height: 50,
    borderColor: 'gray',
    borderWidth: 2,
    paddingHorizontal: 10,
    width: '80%',
    borderRadius: 10,
  },
  button: {
    height: 50,
    marginTop: 50,
    marginLeft: 40,
    backgroundColor: '#9403fc',
    padding: 10,
    borderRadius: 10,
    width: '80%',
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
  }
  

});

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  return (
    <View>
      <Text style={styles.inputText}>{title}</Text>
      <TextInput
        style={styles.input}
        title={title}
        keyboardType="email-address"
        autoCapitalize="none">
      </TextInput>
    </View>
  );
}

const App = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.center}>
        <Text style={styles.textBemVindo}>Bem vindo(a) à Taqtile!</Text>
      </View>
      <Section title="E-mail"></Section>
      <Section title="Senha"></Section>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default App;
