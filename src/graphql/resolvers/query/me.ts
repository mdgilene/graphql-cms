import { IFieldResolver } from "graphql-tools";
import { IContext } from "../../context";
import { IUser } from "../../../models/user";

export const me: IFieldResolver<any, IContext> = async (
  _,
  __,
  { dataSources }
): Promise<IUser> => {
  return dataSources.userAPI.getProfile();
};
