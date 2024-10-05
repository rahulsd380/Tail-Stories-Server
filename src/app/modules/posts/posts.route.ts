import express, { NextFunction, Request, Response } from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../auth/auth.constannts";
import { PostControllers } from "./posts.controller";
import { upload } from "../../utils/sendImageToCloudinary";

const router = express.Router();

router.post(
  "/create-post",
  upload.array("files", 10),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  PostControllers.createPost
);

router.get("/", auth(UserRole.admin), PostControllers.getAllPosts);
router.put("/:id", PostControllers.updatePost);
router.delete("/:id", PostControllers.deletePost);
router.get("/:postId", PostControllers.getSinglePostById);

export const postRoutes = router;
