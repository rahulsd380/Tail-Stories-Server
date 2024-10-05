export type TLoginAuth = {
  email: string;
  password: string;
};

import { Model } from "mongoose";
import { UserRole } from "./auth.constannts";

export interface TUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: "admin" | "user";
}

export interface UserModel extends Model<TUser> {
  isUserExists(email: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof UserRole;
