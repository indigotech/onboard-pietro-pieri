// BlankPage.js

import React from "react";
import { View, Text, StyleSheet } from "react-native";

const BlankPage = () => {
  return (
    <View style={styles.container}>
      <Text>Página em Branco</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BlankPage;
