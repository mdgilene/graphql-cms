import { DirectiveResolverFn } from "graphql-tools";
import { IContext } from "../context";
import { AuthenticationError } from "apollo-server";

export const isAuthenticated: DirectiveResolverFn<any, IContext> = async (
  next,
  source,
  args,
  { user }
): Promise<any> => {
  if (!user) {
    throw new AuthenticationError("You are not authenticated");
  }
  return next();
};
