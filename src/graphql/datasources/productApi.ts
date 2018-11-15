import { DataSource } from "./dataSource";
import { IContext } from "../context";
import { ProductKind } from "../../models/product";
import { VariableProduct } from "../../models/variableProduct";
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
}
