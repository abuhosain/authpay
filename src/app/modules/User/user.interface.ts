import { Model } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  role: "admin" | "user";
  password : string;
  userName: string;
  isDeleted: boolean;
  isBlocked: boolean;
}

export interface UserModel extends Model<IUser> {
  isUserExistsByEmail(email: string): Promise<IUser>;

  isUserPasswordMatch(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}
