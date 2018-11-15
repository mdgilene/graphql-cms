import { Schema, model, Model, Document } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  name: string;
  email: string;
  isAdmin: boolean;

  hash: string;

  getJwtToken(): string;
  setPassword(password: string): Promise<IUser>;
  authenticate(password: string): Promise<IUser>;
}

interface IUserModel extends Model<IUser> {
  register(email: string, password: string): Promise<IUser>;
}

const UserSchema = new Schema({
  name: String,
  email: String,
  isAdmin: Boolean,
  hash: String
});

UserSchema.set("toJSON", {
  getters: true,
  virtuals: true,
  minimize: false,
  transform: (doc: any, ret: any) => {
    delete ret.hash;
    return ret;
  }
});

UserSchema.method("getJwtToken", function(this: IUser) {
  return jwt.sign(
    {
      id: this._id,
      name: this.name,
      email: this.email
    },
    process.env["jwt.secret"] as string,
    { expiresIn: "5h" }
  );
});

UserSchema.method("setPassword", async function(
  this: IUser,
  password: string
): Promise<IUser> {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  this.hash = hash;
  return this;
});

UserSchema.method("authenticate", async function(
  this: IUser,
  password: string
): Promise<IUser> {
  const result = await bcrypt.compare(password, this.hash);
  if (result) {
    return this;
  } else {
    throw new Error("Authentication failed");
  }
});

UserSchema.static("register", async function(
  this: IUserModel,
  email: string,
  password: string
): Promise<IUser> {
  if (await this.findOne({ email })) {
    throw new Error("User already exists");
  } else {
    const user = new this({ email });
    await user.setPassword(password);
    await user.save();
    return user;
  }
});

export const User = model<IUser, IUserModel>("Users", UserSchema);
