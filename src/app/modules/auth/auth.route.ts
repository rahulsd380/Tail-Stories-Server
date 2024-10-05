import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidations } from './auth.validation';
import { AuthControllers } from './auth.controller';
import userValidation from '../users/users.validation';
const router = express.Router();

router.post('/signup', validateRequest(userValidation), AuthControllers.createUser);
router.post('/login', validateRequest(AuthValidations.LoginValidationSchema), AuthControllers.loginUser);
router.post('/refresh-token', validateRequest(AuthValidations.refreshToeknValidationSchema), AuthControllers.refreshToekn);

export const AuthRoute = router;