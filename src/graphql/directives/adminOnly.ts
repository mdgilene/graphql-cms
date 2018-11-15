import { DirectiveResolverFn } from "graphql-tools";
import { IContext } from "../context";
import { AuthenticationError } from "apollo-server";

export const adminOnly: DirectiveResolverFn<any, IContext> = async (
  next,
  source,
  args,
  { dataSources, user }
): Promise<any> => {
  if (!user || !(await dataSources.userAPI.isAdmin())) {
    throw new AuthenticationError(
      "You are not authorized to perform this action"
    );
  }
  return next();
};
