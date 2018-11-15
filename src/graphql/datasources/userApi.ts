import { IContext } from "../context";
import { User, IUser } from "../../models/user";
import { DataSource } from "./dataSource";

export class UserAPI extends DataSource {
  context: IContext;

  initialize(context: IContext) {
    this.context = context;
  }

  async register(email: string, password: string): Promise<string> {
    try {
      const user = await User.register(email, password);
      const authUser = await user.authenticate(password);
      return authUser.getJwtToken();
    } catch (err) {
      throw err;
    }
  }

  async login(email: string, password: string): Promise<string> {
    try {
      const user = await User.findOne({ email });
      if (user) {
        const authUser = await user.authenticate(password);
        const token = authUser.getJwtToken();

        this.context.res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          maxAge: 1000 * 60 * 60 * 24
        });
        return token;
      } else {
        throw new Error("User not found");
      }
    } catch (err) {
      throw err;
    }
  }

  async getProfile(): Promise<IUser> {
    try {
      const user = await User.findById(this.context.user.id);
      if (user) {
        return user;
      } else {
        throw new Error("Profile not found");
      }
    } catch (err) {
      throw err;
    }
  }

  async isAdmin(): Promise<boolean> {
    try {
      const user = await User.findById(this.context.user.id);
      if (user && user.isAdmin) {
        return true;
      }
      return false;
    } catch (err) {
      throw err;
    }
  }
}
