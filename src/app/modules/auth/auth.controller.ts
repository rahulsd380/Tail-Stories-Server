import httpStatus from "http-status";
import { AuthServices } from "./auth.service";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

const createUser = catchAsync(async (req, res) => {
  console.log(req.body);
  const result = await AuthServices.createUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Logged in successfully.",
    data: result,
  });
});

const refreshToekn = catchAsync(async (req, res) => {
  console.log(req.cookies);
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "New access token generated successfully.",
    data: result,
  });
});

export const AuthControllers = {
  createUser,
  loginUser,
  refreshToekn,
};
