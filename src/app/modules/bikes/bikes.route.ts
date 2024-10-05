import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BikeControllers } from '../bikes/bikes.controller';
import bikeValidation from './bikes.validation';
import auth from '../../middlewares/auth';
import { UserRole } from '../auth/auth.constannts';

const router = express.Router();

router.post('/', auth(UserRole.admin), validateRequest(bikeValidation), BikeControllers.createBike);
router.get('/', BikeControllers.getAllBikes);
router.put('/:id', auth(UserRole.admin), BikeControllers.updateBike);
router.delete('/:id', auth(UserRole.admin), BikeControllers.deleteBike);
router.get('/:bikeId', BikeControllers.getSingleBikeById);

export const bikeRoutes = router;