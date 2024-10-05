/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import { TLoginAuth, TUser } from "./auth.interface";
import AppError from "../../errors/AppError";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import { createToekn } from "./auth.utils";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { User } from "./auth.model";

// Create user route
const createUser = async (file: any, payload: Partial<TUser>) => {

 // checking if the file is there or not
  if (file && file.path) {
    const imageName = `${payload?.name}-${payload?.email}`;
    const path = file.path;

    // Upload the image to Cloudinary
    const { secure_url } = await sendImageToCloudinary(imageName, path);
    payload.profilePicture = secure_url;
  }

  const payloadData = {
    name: payload?.name || "",
    email: payload?.email || "",
    password: payload?.password || "",
    userName: payload?.userName || "Anonymous",
    dateOfBirth: payload?.dateOfBirth || null,
    profilePicture: payload?.profilePicture || "",
    phoneNumber: payload?.phoneNumber || "",
    gender: payload?.gender || "",
    bio: payload?.bio || "",
    location: payload?.location || "",
    website: payload?.website || "",
    occupation: payload?.occupation || "",
    socialMediaLinks: payload?.socialMediaLinks || [],
    role: "user",
  };


  // Checking if user already exists
  const isUserExists = await User.findOne({ email: payloadData.email });
  if (isUserExists) {
    throw new AppError(httpStatus.CONFLICT, "User already exists.");
  }

  // Create user in the database
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
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
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
