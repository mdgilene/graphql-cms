import { gql } from "apollo-server";

const ProdcutInterface = `
  upc: String!
  kind: ProductKind!
`;

export const Product = gql`
  interface IProduct {
    ${ProdcutInterface}
  }

  enum ProductKind {
    BASIC
    VARIABLE
  }
  

  type BasicProduct implements IProduct {
    ${ProdcutInterface}
  }

  type VariableProduct implements IProduct {
    variations: String!

    ${ProdcutInterface}
  }
`;
