import { Alert } from "react-native";

export interface UserForm {
  name: string;
  phone: string;
  birthDate: string;
  email: string;
  role: string;
  password: string;
}

export interface ErrorForm {
  errorName: boolean;
  errorPhone: boolean;
  errorBirthDate: boolean;
  errorEmail: boolean;
  errorPassword: boolean;
}

interface FormValidation {
  error: ErrorForm;
  isValid: boolean;
}

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

const formValidation = (form: UserForm): FormValidation => {
  const errorForm: ErrorForm = {
    errorName: false,
    errorBirthDate: false,
    errorEmail: false,
    errorPhone: false,
    errorPassword: false,
  };

  const formValidation: FormValidation = {
    isValid: true,
    error: errorForm,
  };

  if (form.name === "") {
    errorForm.errorName = true;

    formValidation.isValid = false;

    return formValidation;
  } else if (form.phone === "") {
    errorForm.errorPhone = true;

    formValidation.isValid = false;

    return formValidation;
  } else if (!isvalidateBirthDate(form.birthDate)) {
    Alert.alert(
      "Erro",
      "Insira uma data de nascimento válida (antes de 01-01-2020 e no formato DD/MM/YYYY)",
    );

    errorForm.errorBirthDate = true;

    formValidation.isValid = false;

    return formValidation;
  } else if (!isValidPassword(form.password)) {
    Alert.alert(
      "Erro",
      "A senha deve ter pelo menos 7 caracteres, pelo menos uma letra e um dígito.",
    );

    errorForm.errorPassword = true;

    formValidation.isValid = false;

    return formValidation;
  } else if (!isValidEmail(form.email)) {
    Alert.alert("Erro", "Insira um e-mail válido.");

    errorForm.errorEmail = true;

    formValidation.isValid = false;

    return formValidation;
  } else {
    return formValidation;
  }
};

export { isValidEmail, isValidPassword, isvalidateBirthDate, formValidation };
