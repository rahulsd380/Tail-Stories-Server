// users.route.ts
import express, { NextFunction, Request, Response } from 'express';
import { UserControllers } from './users.controller';
import auth from '../../middlewares/auth';
// import { upload } from '../../utils/sendImageToCloudinary';
import { multerUpload } from '../../config/multer.config';

const router = express.Router();

router.get('/', UserControllers.getAllUser);
router.get('/me', auth('user', 'admin'), UserControllers.getMe);
router.get('/:userId',auth('user', 'admin'), UserControllers.getSingleUserById);
router.get('/my-posts/:authorId', auth('user', 'admin'), UserControllers.getMyPosts);

router.put('/me',
  multerUpload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    if(req?.body?.data){
      req.body = JSON.parse(req?.body?.data);
    }
    next();
  },
UserControllers.updateProfile);


router.delete('/delete-user/:userId', auth('admin'), UserControllers.deleteUser);
router.put('/make-admin/:userId', auth('admin'),  UserControllers.changeUserRoleToAdmin);
router.put('/make-user/:userId', auth('admin'),  UserControllers.changeUserRoleToUser);

router.put('/follow/:userId', auth('user', 'admin'), UserControllers.followUser);
router.put('/unfollow/:userId', auth('user', 'admin'), UserControllers.unfollowUser);


export const userRoutes = router;
