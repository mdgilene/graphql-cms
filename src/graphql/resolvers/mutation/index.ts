import { IResolverObject } from "graphql-tools";
import { register } from "./register";
import { createProduct } from "./createProduct";

export const Mutation: IResolverObject = {
  register,
  createProduct
};
