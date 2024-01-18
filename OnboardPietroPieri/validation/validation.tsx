import { Alert } from "react-native";

const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPassword = (password: string) => {
  return (
    password.length >= 7 && /[a-zA-Z]/.test(password) && /\d/.test(password)
  );
};

const isvalidateBirthDate = (birthDate: string) => {
  const [year, month, day] = birthDate.split("-");
  const currentDate = new Date();
  const minimumDate = new Date(2020, 1, 1);

  const selectedDate = new Date(+year, +month - 1, +day);

  if (isNaN(selectedDate.getTime()) || selectedDate > currentDate) {
    return false;
  }
  return selectedDate <= minimumDate;
};

const formValidate = (
  password: string,
  email: string,
  birthDate: string,
): boolean => {
  if (!isvalidateBirthDate(birthDate)) {
    Alert.alert(
      "Erro",
      "Insira um data de nascimento valida (antes de 01-01-2020 e no formato (DD/MM/YYYY)",
    );

    return false;
  } else if (!isValidPassword(password)) {
    Alert.alert(
      "Erro",
      "Por favor, a senha deve não ser vazia, deve ter pelo menos 7 caracteres, pelo menos uma letra e um dígito.",
    );

    return false;
  } else if (!isValidEmail(email)) {
    Alert.alert("Erro", "Por favor, insira um email válido.");

    return false;
  }
  return true;
};

export { isValidEmail, isValidPassword, isvalidateBirthDate, formValidate };
