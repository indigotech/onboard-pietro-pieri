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

export { isValidEmail, isValidPassword, isvalidateBirthDate };
