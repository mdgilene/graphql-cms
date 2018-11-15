import { gql } from "apollo-server";

export const Mutation = gql`
  type Mutation {
    """
    Register a new user

    Returns: Authorization token
    """
    register(email: String!, password: String!): String

    createProduct(kind: ProductKind): IProduct @adminOnly
  }
`;
