import { gql } from "apollo-server";

export const Directives = gql`
  directive @isAuthenticated on QUERY | FIELD_DEFINITION
  directive @adminOnly on QUERY | MUTATION | FIELD_DEFINITION
`;
