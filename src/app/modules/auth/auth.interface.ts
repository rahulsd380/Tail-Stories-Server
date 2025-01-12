export type TLoginAuth = {
  email: string;
  password: string;
};

import { Model } from "mongoose";
import { UserRole } from "./auth.constannts";

export interface SocialMediaLink {
  platform: string;
  url: string;
};

export interface FriendRequest {
  friendId: string;
  status: "pending" | "accepted" | "declined";
};

export interface TUser {
  _id: string;
  name: string;
  userName: string;
  email: string;
  password: string;
  dateOfBirth: Date;
  profilePicture?: string;
  phoneNumber: string;
  gender?: "male" | "female" | "other";
  bio?: string;
  location?: string;
  website?: string;
  occupation?: string;
  socialMediaLinks?: SocialMediaLink[];
  followers: Array<string>;
  following: Array<string>;
  friends : Array<string>;
  friendReq: {
    sent: FriendRequest[];
    received: FriendRequest[];
  };
  role: "admin" | "user";
  isVerified: boolean;
}




export interface UserModel extends Model<TUser> {
  isUserExists(email: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof UserRole;
