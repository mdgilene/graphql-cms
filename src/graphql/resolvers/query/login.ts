import { IFieldResolver } from "graphql-tools";
import { IContext } from "../../context";

export const login: IFieldResolver<any, IContext> = async (
  _,
  { email, password },
  { dataSources }
): Promise<string> => {
  return await dataSources.userAPI.login(email, password);
};
