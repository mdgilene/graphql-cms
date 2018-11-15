import { IFieldResolver } from "graphql-tools";
import { IContext } from "../../context";

export const createProduct: IFieldResolver<any, IContext> = async (
  _,
  { kind },
  { dataSources }
): Promise<any> => {
  return dataSources.productAPI.createProduct(kind);
};
