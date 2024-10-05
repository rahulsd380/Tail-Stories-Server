// users.controller.ts
import { UserServices } from './users.services';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const getAllUser = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUser();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully',
    data: result,
  });
});

const getMe = catchAsync(async (req, res) => {
  const authorId = req.user.userId;
  const result = await UserServices.getMe(authorId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User profile retrieved successfully',
    data: result,
  });
});

const getMyPosts = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const result = await UserServices.getMyPosts(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User profile retrieved successfully',
    data: result,
  });
});

const updateProfile = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const result = await UserServices.updateProfile(userId, req.body);

  console.log("Update request received:", userId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Profile updated successfully",
    data: result,
  });
});

const changeUserRoleToAdmin = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await UserServices.changeUserRoleToAdmin(userId);

  console.log(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User role updated to admin successfully',
    data: result,
  });
});

const changeUserRoleToUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await UserServices.changeUserRoleToUser(userId);

  console.log(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User role updated to admin successfully',
    data: result,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  const result = await UserServices.deleteUser(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted succesfully',
    data: result,
  });
});

export const UserControllers = {
  getAllUser,
  getMe,
  updateProfile,
  deleteUser,
  changeUserRoleToAdmin,
  changeUserRoleToUser,
  getMyPosts,
};
