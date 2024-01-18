import { gql } from "@apollo/client";
import { PageInput } from "../interfaces/mutation";

export const USERS = gql`
  query Users($input: PageInput) {
    users(data: $input) {
      nodes {
        id
        name
        phone
        birthDate
        email
        role
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
