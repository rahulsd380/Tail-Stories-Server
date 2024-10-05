import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../users/users.model";
import { TCouponCode } from "./couponCode.interface";
import { CouponCode } from "./couponCode.model";

const createCouponCode = async (payload: TCouponCode) => {

  const isAdmin = await User.findOne({role: 'admin'});
  if(!isAdmin){
    throw new AppError(httpStatus.BAD_REQUEST, "Only admin can create coupon code!")
  }
  const result = await CouponCode.create(payload);
  return result;
};

const validateCouponCode = async (couponCode: string) => {
  const coupon = await CouponCode.findOne({ couponCode });

  if (!coupon) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid or expired coupon code!");
  }

  // Check if the coupon has expired
  // const currentDate = new Date();
  // if (coupon.expiryDate && currentDate > coupon.expiryDate) {
  //   throw new AppError(httpStatus.BAD_REQUEST, "Coupon code has expired!");
  // }

  // Check if usage limit is applicable
  // if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
  //   throw new AppError(httpStatus.BAD_REQUEST, "Coupon usage limit exceeded!");
  // }

  return {
    off: coupon.off,
  };
};

const getAllCouponCodes = async () => {
  const result = await CouponCode.find();
  return result;
};

const deleteCouponCode = async (couponId: string) => {
  const result = await CouponCode.findByIdAndDelete(couponId);
  return result;
};

export const CouponCodeServices = {
  createCouponCode,
  getAllCouponCodes,
  deleteCouponCode,
  validateCouponCode
};