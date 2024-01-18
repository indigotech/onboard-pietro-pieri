import { Alert } from "react-native";
import { ErrorForm, UserForm } from "../interfaces/component";

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPassword = (password: string): boolean => {
  return (
    password.length >= 7 && /[a-zA-Z]/.test(password) && /\d/.test(password)
  );
};

const isvalidateBirthDate = (birthDate: string): boolean => {
  const [year, month, day] = birthDate.split("-");
  const currentDate = new Date();
  const minimumDate = new Date(2020, 1, 1);

  const selectedDate = new Date(+year, +month - 1, +day);

  if (isNaN(selectedDate.getTime()) || selectedDate > currentDate) {
    return false;
  }
  return selectedDate <= minimumDate;
};

const isEmpty = (value: string): boolean => {
  if (value === "") {
    return true;
  } else {
    return false;
  }
};

const formValidation = (form: UserForm): [ErrorForm, boolean] => {
  const errorForm: ErrorForm = {
    errorName: false,
    errorBirthDate: false,
    errorEmail: false,
    errorPhone: false,
    errorPassword: false,
  };

  if (isEmpty(form.name)) {
    errorForm.errorName = true;

    return [errorForm, false];
  } else if (isEmpty(form.phone)) {
    errorForm.errorPhone = true;

    return [errorForm, false];
  } else if (!isvalidateBirthDate(form.birthDate)) {
    Alert.alert(
      "Erro",
      "Insira uma data de nascimento válida (antes de 01-01-2020 e no formato DD/MM/YYYY)",
    );

    errorForm.errorBirthDate = true;

    return [errorForm, false];
  } else if (!isValidPassword(form.password)) {
    Alert.alert(
      "Erro",
      "A senha deve ter pelo menos 7 caracteres, pelo menos uma letra e um dígito.",
    );

    errorForm.errorPassword = true;

    return [errorForm, false];
  } else if (!isValidEmail(form.email)) {
    Alert.alert("Erro", "Insira um e-mail válido.");

    errorForm.errorEmail = true;

    return [errorForm, false];
  } else {
    return [errorForm, true];
  }
};

export {
  isValidEmail,
  isValidPassword,
  isvalidateBirthDate,
  isEmpty,
  formValidation,
};
