import { IResolvers } from "graphql-tools";
import { Query } from "./query";
import { Mutation } from "./mutation";
import { ProductKind } from "../../models/product";

export const resolvers: IResolvers = {
  Query,
  Mutation,
  IProduct: {
    __resolveType(product: any) {
      if (product.kind === ProductKind.VARIABLE) return "VariableProduct";
      return "BasicProduct";
    }
  }
};
