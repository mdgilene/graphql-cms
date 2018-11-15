import { Schema, Model } from "mongoose";
import { IProduct, ProductKind, ProductBase } from "./product";

export interface IVariableProduct extends IProduct {
  varations: String;
}

interface IVariableProductModel extends Model<IVariableProduct> {}

const VariableProductSchema = new Schema({
  variations: {
    type: String,
    default: "VARIATIONS"
  }
});

export const VariableProduct = ProductBase.discriminator<IVariableProduct>(
  ProductKind.VARIABLE,
  VariableProductSchema
);
