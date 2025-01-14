import express, { Request, Response, NextFunction } from 'express';
import { GroupControllers } from './group.controller';
import { multerUpload } from '../../config/multer.config';

const router = express.Router();

router.post(
  '/create-group',
  multerUpload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 },
  ]),
  (req: Request, res: Response, next: NextFunction) => {
    // Parse the JSON data from the 'data' field
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  GroupControllers.createGroup
);

router.get('/', GroupControllers.getAllGroups);
router.get('/:groupId', GroupControllers.getSingleGroup);
router.delete('/:groupId', GroupControllers.deleteGroup);

export const GroupRoutes = router;
