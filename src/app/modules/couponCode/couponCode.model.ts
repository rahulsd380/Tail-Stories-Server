import { Schema, model } from "mongoose";
import { TCouponCode } from "./couponCode.interface";

const couponCodeSchema: Schema = new Schema<TCouponCode>(
  {
    couponCode: {
      type: String,
      required: [true, "Coupon code is required"],
    },
    off: {
      type: Number,
      required: [true, "% is required"],
    }
  },
  {
    timestamps: true,
  }
);

export const CouponCode = model<TCouponCode>("CouponCode", couponCodeSchema);