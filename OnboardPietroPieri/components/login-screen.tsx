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
  View,
  Text,
  StyleSheet
} from 'react-native';

type TextFieldProps = PropsWithChildren<{
  title: string;
  type?: string;
}>;

type LoginButtonProps = PropsWithChildren<{
  body: string;
}>;

function TextField({title, type}: TextFieldProps): React.JSX.Element {
  const isPassword = type === 'password';
  return (
    <View>
      <Text style={styles.inputText}>{title}</Text>
      <TextInput
        style={styles.input}
        keyboardType={isPassword ? 'default' : 'email-address'}
        autoCapitalize='none'
        secureTextEntry={isPassword}>
      </TextInput>
    </View>
  );
}

function LoginButton({body}: LoginButtonProps): React.JSX.Element {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>{body}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
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

export {TextField, LoginButton};
