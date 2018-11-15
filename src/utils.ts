import { Config } from "./models/config";

export const getNextProductCode = async (): Promise<string> => {
  const config = await Config.getConfig();
  let lastProductCode = config.lastProductCode;
  lastProductCode++;
  config.lastProductCode = lastProductCode;
  await config.save();

  const upc = lastProductCode.toString().padStart(10, "0");
  return upc;
};
