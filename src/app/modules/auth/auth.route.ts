import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidations } from './auth.validation';
import { AuthControllers } from './auth.controller';
const router = express.Router();

router.post('/signup', AuthControllers.createUser);
router.post('/login', validateRequest(AuthValidations.LoginValidationSchema), AuthControllers.loginUser);
router.post('/refresh-token', validateRequest(AuthValidations.refreshTokenValidationSchema), AuthControllers.refreshToken);

export const AuthRoute = router;