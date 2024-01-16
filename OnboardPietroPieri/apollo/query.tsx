import { gql } from "@apollo/client";
import { PageInput } from "../interfaces/mutation";

export const USERS = gql`
  query Users {
    users {
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
