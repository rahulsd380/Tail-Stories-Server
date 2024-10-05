import express, { NextFunction, Request, Response } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidations } from "./auth.validation";
import { AuthControllers } from "./auth.controller";
import { upload } from "../../utils/sendImageToCloudinary";
const router = express.Router();

router.post(
  "/signup",
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  AuthControllers.createUser
);
router.post(
  "/login",
  validateRequest(AuthValidations.LoginValidationSchema),
  AuthControllers.loginUser
);
router.post(
  "/refresh-token",
  validateRequest(AuthValidations.refreshTokenValidationSchema),
  AuthControllers.refreshToken
);

export const AuthRoute = router;
