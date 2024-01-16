import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { User } from "../interfaces/mutation";

export const renderItem = ({ item }: { item: User }) => (
  <View style={styles.userItem}>
    <Text style={styles.userName}>{item.name}</Text>

    <Text style={styles.userEmail}>{item.email}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  userItem: {
    backgroundColor: "#eee",
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userEmail: {
    fontSize: 14,
    color: "gray",
  },
});
