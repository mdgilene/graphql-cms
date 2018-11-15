import { IResolverObject } from "graphql-tools";
import { login } from "./login";
import { me } from "./me";

export const Query: IResolverObject = {
  login,
  me
};
