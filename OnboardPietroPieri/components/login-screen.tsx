/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import {
  TouchableOpacity,
  TextInput,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

interface TextFieldProps {
  title: string;
  type?: string;
  onChange: (value: string) => void;
}

interface ButtonProps {
  body: string;
  onPress: () => void;
  loading: boolean;
}

function TextField({
  title,
  type,
  onChange,
}: TextFieldProps): React.JSX.Element {
  const isPassword = type === "password";
  return (
    <View>
      <Text style={styles.inputText}>{title}</Text>
      <TextInput
        style={styles.input}
        keyboardType={isPassword ? "default" : "email-address"}
        autoCapitalize="none"
        secureTextEntry={isPassword}
        onChangeText={onChange}
      ></TextInput>
    </View>
  );
}

function Button({ body, onPress, loading }: ButtonProps): React.JSX.Element {
  return (
    <TouchableOpacity
      style={[styles.button, loading ? styles.disabledButton : null]}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color="black" size="small" />
      ) : (
        <Text style={styles.buttonText}>{body}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  inputText: {
    color: "black",
    fontWeight: "normal",
    marginLeft: 40,
    top: 28,
  },
  input: {
    marginLeft: 40,
    marginTop: 30,
    height: 50,
    borderColor: "gray",
    borderWidth: 2,
    paddingHorizontal: 10,
    width: "80%",
    borderRadius: 10,
  },
  button: {
    height: 50,
    marginTop: 50,
    marginLeft: 40,
    backgroundColor: "#9403fc",
    padding: 10,
    borderRadius: 10,
    width: "80%",
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: "yellow",
  },
});

export { TextField, Button };
