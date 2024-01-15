import React, { useState } from "react";
import {
  TextInput,
  StyleSheet,
  Text,
  ScrollView,
  Alert,
  View,
} from "react-native";
import { RadioButton } from "react-native-paper";
import {
  isValidEmail,
  isValidPassword,
  isvalidateBirthDate,
} from "../validation/validation";
import { ApolloError, useMutation } from "@apollo/client";
import { CREATE_USER } from "../apollo/mutation";
import { Button } from "./login-screen";
import { User } from "../interfaces/mutation";

interface UserFormProps {
  closeModal: () => void;
}

export const UserForm = ({ closeModal }: UserFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [createUser, { error, data }] = useMutation<User>(CREATE_USER);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async () => {
    setLoading(true);
    const userData = { name, email, phone, birthDate, password, role };
    if (!isvalidateBirthDate(userData.birthDate)) {
      Alert.alert(
        "Erro",
        "Insira um data de nascimento valida (antes de 01-01-2020 e no formato (DD/MM/YYYY)",
      );
    } else if (!isValidPassword(userData.password)) {
      Alert.alert(
        "Erro",
        "Por favor, a senha deve não ser vazia, deve ter pelo menos 7 caracteres, pelo menos uma letra e um dígito.",
      );
    } else if (!isValidEmail(userData.email)) {
      Alert.alert("Erro", "Por favor, insira um email válido.");
    } else {
      try {
        const response = await createUser({
          variables: { data: userData },
        });

        if (response.data) {
          Alert.alert("Sucesso", "Usuario cadastrado", [
            {
              onPress: () => {
                closeModal();
              },
            },
          ]);
        }
        if (response.errors) {
          Alert.alert("Erro", response.errors.toString());
        }
      } catch (error) {
        if (error) {
          const errorApollo = error as ApolloError;
          Alert.alert("Erro", errorApollo.message);
        }
      }
    }
    setLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={phone}
        onChangeText={(text) => setPhone(text)}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Data de nascimento - (YYYY-MM-DD)"
        value={birthDate}
        onChangeText={(text) => setBirthDate(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Text style={styles.label}>Permissão:</Text>
      <View>
        <RadioButton.Group
          onValueChange={(value) => setRole(value)}
          value={role}
        >
          <View style={styles.radioContainer}>
            <Text>Usuário</Text>
            <RadioButton value="user" />
          </View>
          <View style={styles.radioContainer}>
            <Text>Administrador</Text>
            <RadioButton value="admin" />
          </View>
        </RadioButton.Group>
      </View>
      <Button body="Enviar" onPress={handleFormSubmit} loading={loading} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    flexGrow: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  roleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
