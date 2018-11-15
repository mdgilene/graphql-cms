import { gql } from "apollo-server";

export const Query = gql`
  type Query {
    """
    Login a user

    Returns: Authorization token
    """
    login(email: String!, password: String!): String

    """
    Get currently logged in user profile
    """
    me: User @isAuthenticated
  }
`;
