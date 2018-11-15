import { gql } from "apollo-server";

export const User = gql`
  type User {
    email: String
    name: String
    isAdmin: Boolean
  }
`;
