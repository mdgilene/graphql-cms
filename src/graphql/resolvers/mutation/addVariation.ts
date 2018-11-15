import { IFieldResolver } from "graphql-tools";
import { IContext } from "../../context";

export const addVariation: IFieldResolver<any, IContext> = async (
  _,
  { upc, variation },
  { dataSources }
): Promise<any> => {
  return dataSources.productAPI.addVariation(upc, variation);
};
