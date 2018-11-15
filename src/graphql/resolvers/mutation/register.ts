import { IFieldResolver } from "graphql-tools";
import { IContext } from "../../context";

export const register: IFieldResolver<any, IContext> = async (
  _,
  { email, password },
  { dataSources }
): Promise<any> => {
  return dataSources.userAPI.register(email, password);
};
