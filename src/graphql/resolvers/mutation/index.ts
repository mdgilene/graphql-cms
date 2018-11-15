import { IResolverObject } from "graphql-tools";
import { register } from "./register";
import { createProduct } from "./createProduct";
import { addVariation } from "./addVariation";

export const Mutation: IResolverObject = {
  register,
  createProduct,
  addVariation
};
