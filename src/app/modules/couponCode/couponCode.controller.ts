
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { CouponCodeServices } from './couponCode.services';

const createCouponCode = catchAsync(async (req, res) => {
  const result = await CouponCodeServices.createCouponCode(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Coupon code added successfully',
    data: result,
  });
});

const validateCouponCode = catchAsync(async (req, res) => {
  const { couponCode } = req.body;
  const result = await CouponCodeServices.validateCouponCode(couponCode);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Coupon code validated successfully',
    data: result,
  });
});

const getAllCouponCodes = catchAsync(async (req, res) => {
  const result = await CouponCodeServices.getAllCouponCodes();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Coupon code retrieved successfully',
    data: result,
  });
});


const deleteCouponCode = catchAsync(async (req, res) => {
  const { couponId } = req.params;
  const result = await CouponCodeServices.deleteCouponCode(couponId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Coupon code deleted successfully",
    data: result,
  });
});

export const CouponCodeControllers = {
  createCouponCode,
  getAllCouponCodes,
  deleteCouponCode,
  validateCouponCode
};
