import { Schema, model, Model, Document } from "mongoose";

export interface IConfig extends Document {
  lastProductCode: number;
}

interface IConfigModel extends Model<IConfig> {
  getConfig(): IConfig;
}

const ConfigSchema = new Schema(
  {
    lastProductCode: {
      type: Number,
      default: 0,
      required: true
    }
  },
  {
    capped: { max: 1 }
  }
);

ConfigSchema.static("getConfig", async function(this: IConfigModel) {
  const config = await this.findOne();
  if (config) {
    return config;
  } else {
    return await this.create({});
  }
});

export const Config = model<IConfig, IConfigModel>("config", ConfigSchema);
