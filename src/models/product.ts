import { Schema, model, Model, Document } from "mongoose";
import { getNextProductCode } from "../utils";

export interface IProduct extends Document {
  upc: string;
}

export enum ProductKind {
  BASIC = "BASIC",
  VARIABLE = "VARIABLE"
}

interface IProductModel extends Model<IProduct> {}

const ProductSchemaBase = new Schema(
  {
    upc: {
      type: String
    }
  },
  { discriminatorKey: "kind" }
);

ProductSchemaBase.pre("save", async function(this: IProduct) {
  if (!this.upc) {
    this.upc = await getNextProductCode();
  }
});

export const ProductBase = model<IProduct, IProductModel>(
  "Product",
  ProductSchemaBase
);
