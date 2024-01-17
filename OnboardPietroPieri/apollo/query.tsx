import { gql } from "@apollo/client";
import { PageInput } from "../interfaces/mutation";

export const USERS = gql`
  query Users($input: PageInput) {
    users(data: $input) {
      nodes {
        name
        email
        id
      }
      count
      pageInfo {
        offset
        limit
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

export const USER = gql`
  query User($id: ID) {
    user(id: $id) {
      id
      name
      phone
      birthDate
      email
      role
    }
  }
`;
