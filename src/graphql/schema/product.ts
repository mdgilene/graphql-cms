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
    basic
    variable
  }
  

  type BasicProduct implements IProduct {
    ${ProdcutInterface}
  }

  type VariableProduct implements IProduct {
    variations: [Variation]

    ${ProdcutInterface}
  }

  type Variation {
    size: String
  }

  input VariationInput {
    size: String
  }
`;
