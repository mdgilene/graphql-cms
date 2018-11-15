import { UserAPI } from "./datasources/userApi";
import { IUser, User } from "../models/user";
import { DataSource } from "./datasources/dataSource";
import { Request, Response } from "express";
import { ProductAPI } from "./datasources/productApi";
import { Model } from "mongoose";

export interface IContext {
  dataSources: {
    userAPI: UserAPI;
    productAPI: ProductAPI;
    [key: string]: DataSource;
  };
  user: IUser;
  res: Response;
}

export const getContext = async (req: any, res: any): Promise<IContext> => {
  const context: IContext = {
    dataSources: {
      userAPI: new UserAPI(),
      productAPI: new ProductAPI()
    },
    user: req.user,
    res
  };

  // Object.keys(context.dataSources).forEach(key => {
  //   const dataSource = context.dataSources[key] as DataSource;
  // });
  for (const key in context.dataSources) {
    const source = context.dataSources[key];
    source.initialize(context);
  }

  return context;
};
