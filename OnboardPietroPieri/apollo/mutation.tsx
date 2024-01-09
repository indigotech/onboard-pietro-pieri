import { gql } from "@apollo/client";
import { LoginInput } from "../interfaces/mutation";

const LOGIN = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      token
      user {
        id
        name
        phone
        birthDate
        email
        role
      }
    }
  }
`;

export { LOGIN };
