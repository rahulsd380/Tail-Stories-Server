// users.route.ts
import express from 'express';
import { UserControllers } from './users.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get('/', UserControllers.getAllUser);
router.get('/me', auth('user', 'admin'), UserControllers.getMe);
router.put('/me', auth('user', 'admin'), UserControllers.updateProfile);
router.delete('/delete-user/:userId', auth('admin'), UserControllers.deleteUser);
router.put('/change-role/:userId', auth('admin'),  UserControllers.changeUserRoleToAdmin);
router.put('/make-user/:userId', auth('admin'),  UserControllers.changeUserRoleToUser);

export const userRoutes = router;
