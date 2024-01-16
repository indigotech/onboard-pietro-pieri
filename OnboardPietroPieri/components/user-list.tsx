import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { User } from "../interfaces/mutation";
import { USERS } from "../apollo/query";
import { useQuery } from "@apollo/client";
import { Users } from "../interfaces/query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { renderItem } from "../utils/render";

export const UserListScreen = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const getToken = async () => {
      const userToken = await AsyncStorage.getItem("userToken");
      setToken(userToken);
    };

    getToken();
  }, []);

  const { loading, error, data } = useQuery<Users>(USERS, {
    skip: token === null,
    context: {
      headers: {
        authorization: token,
      },
    },
  });

  if (loading) {
    return <ActivityIndicator color="black" size="large" />;
  }

  if (error) {
    return <Text>Ocorreu um ao carregar os usuários: {error.message}</Text>;
  }

  const userList: User[] | undefined = data?.users.nodes;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={userList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
