import { DataSource } from "./dataSource";
import { IContext } from "../context";
import { ProductKind, ProductBase } from "../../models/product";
import {
  VariableProduct,
  IVariableProduct,
  IVariation
} from "../../models/variableProduct";
import { BasicProduct } from "../../models/basicProduct";

export class ProductAPI extends DataSource {
  context: IContext;

  initialize(context: IContext) {
    this.context = context;
  }

  async createProduct(kind: ProductKind) {
    switch (kind) {
      case ProductKind.VARIABLE:
        return VariableProduct.create({});
      default:
        return BasicProduct.create({});
    }
  }

  async addVariation(upc: string, variation: IVariation) {
    const product = await ProductBase.findOne({ upc });

    if (!product) throw new Error("Product not found");

    if (!(product instanceof VariableProduct))
      throw new Error("Not a variable product");

    (product as IVariableProduct).variations.push(variation);
    return product.save();
  }
}
