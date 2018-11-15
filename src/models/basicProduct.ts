import { Schema, Model } from "mongoose";
import { IProduct, ProductKind, ProductBase } from "./product";

export interface IBasicProduct extends IProduct {
  varations: String;
}

interface IBasicProductModel extends Model<IBasicProduct> {}

const BasicProductSchema = new Schema({});

export const BasicProduct = ProductBase.discriminator<IBasicProduct>(
  ProductKind.BASIC,
  BasicProductSchema
);
