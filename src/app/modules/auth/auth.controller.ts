import httpStatus from "http-status";
import { AuthServices } from "./auth.service";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import config from "../../config";

const createUser = catchAsync(async (req, res) => {
  const file = req.file;
  const result = await AuthServices.createUser(file, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {

  const result = await AuthServices.loginUser(req.body);
  
  const {refreshToken} = result;

  res.cookie('refreshToken', refreshToken, {
    secure : config.node_env === 'production',
    httpOnly : true
});

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Logged in successfully.",
    data: result,
  });
});

const refreshToken = catchAsync(async (req, res) => {
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
  refreshToken,
};
