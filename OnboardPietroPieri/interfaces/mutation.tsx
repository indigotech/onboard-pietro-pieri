export interface LoginInput {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  birthDate: string;
  email: string;
  role: string;
}

export interface LoginOutput {
  token: string;
  user: User;
}

export interface LoginData {
  __typename: string;
  login: LoginOutput;
}
