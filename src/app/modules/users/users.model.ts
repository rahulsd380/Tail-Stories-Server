import { Schema, model } from "mongoose";
import { TUser } from "./users.interface";
import bcrypt from "bcrypt";
import config from "../../config";
import { UserModel } from "../auth/auth.interface";

const userSchema: Schema = new Schema<TUser>(
  {
    
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    phone: { type: String },
    address: { type: String },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password as string,
    Number(config.bcrypt_salt_round)
  );
  next();
});

userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

userSchema.statics.isUserExists= async function (email: string){
  return await User.findOne({email})
}

userSchema.statics.isPasswordMatched= async function (plainTextPassword, hashedPassword){
  return await bcrypt.compare(plainTextPassword, hashedPassword);
}

export const User = model<TUser, UserModel>("User", userSchema);
