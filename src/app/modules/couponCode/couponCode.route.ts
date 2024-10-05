import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { UserRole } from '../auth/auth.constannts';
import couponCodeValidation from './couponCode.validation';
import { CouponCodeControllers } from './couponCode.controller';

const router = express.Router();

router.post('/', auth(UserRole.admin), validateRequest(couponCodeValidation), CouponCodeControllers.createCouponCode);
router.get('/', CouponCodeControllers.getAllCouponCodes);
router.delete('/deleteCoupon/:couponId', CouponCodeControllers.deleteCouponCode);
router.post('/validateCoupon', CouponCodeControllers.validateCouponCode);


export const couponCodeRoutes = router;