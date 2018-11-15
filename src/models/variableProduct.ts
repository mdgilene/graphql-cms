import { Schema, Model } from "mongoose";
import { IProduct, ProductKind, ProductBase } from "./product";

export interface IVariableProduct extends IProduct {
  variations: IVariation[];
}

export interface IVariation {
  size: string;
}

interface IVariableProductModel extends Model<IVariableProduct> {}

const VariableProductSchema = new Schema({
  variations: { type: [], default: [] }
});

export const VariableProduct = ProductBase.discriminator<IVariableProduct>(
  ProductKind.VARIABLE,
  VariableProductSchema
);
