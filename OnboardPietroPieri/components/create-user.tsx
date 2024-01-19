import React from "react";
import { View } from "react-native";
import { FAB } from "./fab";
import { useNavigation } from "@react-navigation/native";

export const CreateUser: React.FC = () => {
  const navigation = useNavigation();

  function handleNavigate(): void {
    navigation.navigate("UserForm" as never);
  }

  return (
    <View>
      <FAB onPress={handleNavigate} />
    </View>
  );
};
