import React, { useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuery } from "@apollo/client";
import { USER } from "../apollo/query";
import { UserOutput } from "../interfaces/query";
import { User } from "../interfaces/mutation";
import { BackButton } from "./back-button";

type Props = NativeStackScreenProps<ParamListBase, "UserDetail">;

export const UserDetail: React.FC<Props> = ({ route }) => {
  const { id } = (route.params || {}) as { id?: string };
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);

  const { error, data} = useQuery<UserOutput>(USER, {
    variables: {
      id: id,
    },
    onCompleted: (data) => {
      if (data.user) {
        setUser(data.user);
      }
      setLoading(false);
    },
  });

  if (loading) {
    return <ActivityIndicator color="black" size="large" />;
  }

  if (error) {
    return <Text>Ocorreu um ao carregar o usuário: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <BackButton />
      <View style={styles.body}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatar}>{user?.name[0]}</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{user?.name}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Email:</Text>
          <Text style={styles.infoText}>{user?.email}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Data de Nascimento:</Text>
          <Text style={styles.infoText}>{user?.birthDate}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Telefone:</Text>
          <Text style={styles.infoText}>{user?.phone}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Permissão:</Text>
          <Text style={styles.infoText}>
            {user?.role === "admin" ? "Administrador" : "Usuário"}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECF0F3",
  },
  body: {
    marginTop: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#00000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    shadowOpacity: 0.16,
  },
  avatar: {
    fontSize: 72,
    fontWeight: "700",
  },
  nameContainer: {
    marginTop: 24,
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "600",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666666",
    marginRight: 8,
  },
  infoText: {
    fontSize: 16,
  },
});
