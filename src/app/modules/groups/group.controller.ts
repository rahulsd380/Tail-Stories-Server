import { Request, Response } from 'express';
import { GroupServices } from './group.service';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const createGroup = catchAsync(async (req: Request, res: Response) => {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const logoFile = files.logo ? files.logo[0] : null;
    const coverImageFile = files.coverImage ? files.coverImage[0] : null;
  
    const result = await GroupServices.createGroup(req.body, logoFile, coverImageFile);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Group created successfully',
      data: result,
    });
  });

const getAllGroups = catchAsync(async (_req: Request, res: Response) => {
  const result = await GroupServices.getAllGroups();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Groups retrieved successfully',
    data: result,
  });
});

const getSingleGroup = catchAsync(async (req: Request, res: Response) => {
  const { groupId } = req.params;
  const result = await GroupServices.getSingleGroup(groupId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Group retrieved successfully',
    data: result,
  });
});

const deleteGroup = catchAsync(async (req: Request, res: Response) => {
  const { groupId } = req.params;
  await GroupServices.deleteGroup(groupId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Group deleted successfully',
    data: [],
  });
});

export const GroupControllers = {
  createGroup,
  getAllGroups,
  getSingleGroup,
  deleteGroup,
};
