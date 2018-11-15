import { IContext } from "../context";

export abstract class DataSource {
  public abstract initialize(context: IContext): void;
}
