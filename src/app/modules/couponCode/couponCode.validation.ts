import { z } from "zod";

const couponCodeValidation = z.object({
  body: z.object({
    couponCode: z.string({
      required_error: "Coupon code is required",
      invalid_type_error: "Coupon code must be a string",
    }),
    off: z.number({
      required_error: "% is required",
    })
  })
});

export default couponCodeValidation;