import httpStatus from "http-status";
import { TLoginAuth } from "./auth.interface";
import { User } from "../users/users.model";
import AppError from "../../errors/AppError";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import { TUser } from "../users/users.interface";
import { createToekn } from "./auth.utils";

// Create user route
const createUser = async (payload: TUser) => {
  const {name, email, address, phone, password} = payload;

  const isUserExists = await User.findOne({ email });
  if (isUserExists) {
    throw new AppError(httpStatus.CONFLICT, "User already exists.");
  }

  const payloadData = {
    name : name || "",
    email : email || "",
    address : address || "",
    phone : phone || "",
    password : password || "",
    role : "user",
  }

  console.log(payloadData);
  const result = await User.create(payloadData);
  return result;
};

// Login
const loginUser = async (payload: TLoginAuth) => {
  // Check if the user exists or not

  const user = await User.isUserExists(payload.email);

  
  if (!(await user)) {
    throw new AppError(httpStatus.NOT_FOUND, "User does not exists.");
  }

  // Check if the user already deleted or not
  // const isUserDeleted = isUserexists?.isDeleted;
  // console.log(isUserDeleted);
  // if(isUserDeleted){
  //     throw new AppError(httpStatus.NOT_FOUND, 'This user is deleted form DB!')
  // }

  // Check if the password is correct or not
  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, "Password is not correct.");
  }

  // Create token and send to client/user

  const jwtPayload = {
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  };

  console.log(jwtPayload);

  const accessToken = createToekn(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  const refreshToekn = createToekn(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );

  // Access the user into his account.

  return {
    accessToken,
    refreshToekn,
  };
};

const refreshToken = async (token: string) => {
  // Check if there is any token sent from the client or not.
  if (!token) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "You are not authorized to proceed!"
    );
  }

  // Check if the token is valid or not.
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string
  ) as JwtPayload;

  const { email } = decoded;

  const user = await User.isUserExists(email);
  console.log(user);

  // Checking if the user exists or not
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!");
  }


    // Checking if the user is deleted or not


  // Have to check if the user is suspended or not

  const jwtpayload = {
    userId : user._id,
    email: user.email,
    role: user.role,
  };
  const accessToken = createToekn(
    jwtpayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  return {
    accessToken
  }
};

export const AuthServices = {
  createUser,
  loginUser,
  refreshToken,
};
