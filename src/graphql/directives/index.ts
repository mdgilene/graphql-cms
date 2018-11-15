import { IDirectiveResolvers } from "graphql-tools";
import { isAuthenticated } from "./isAuthenticated";
import { adminOnly } from "./adminOnly";

export const directiveResolvers: IDirectiveResolvers = {
  isAuthenticated,
  adminOnly
};
