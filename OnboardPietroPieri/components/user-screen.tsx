import React, { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserList } from "./user-list";

export const UserListScreen = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const getToken = async () => {
      const userToken = await AsyncStorage.getItem("userToken");
      setToken(userToken);
    };

    getToken();
  }, []);

  if (token === null) {
    return <ActivityIndicator color="black" size="large" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <UserList token={token} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
