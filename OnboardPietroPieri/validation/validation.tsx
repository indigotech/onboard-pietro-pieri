const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPassword = (password: string) => {
  return (
    password.length >= 7 && /[a-zA-Z]/.test(password) && /\d/.test(password)
  );
};

export { isValidEmail, isValidPassword };
