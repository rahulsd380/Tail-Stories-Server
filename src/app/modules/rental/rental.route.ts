import express from 'express';
import auth from '../../middlewares/auth';
import { RentalControllers } from './rental.controller';

const router = express.Router();

router.post('/', auth('user', 'admin'), RentalControllers.createRental);
router.post('/:id/return', RentalControllers.returnBike);    //auth(UserRole.admin)
router.get('/', auth('user', 'admin'), RentalControllers.getAllRentalsForUser);
router.get('/all-rentals', RentalControllers.getAllRentals);

// auth('admin')
export const rentalRoutes = router;