import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const Header = () => {
  return (
    <View style={styles.center}>
      <Text style={styles.header}>Bem vindo(a) à Taqtile!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
