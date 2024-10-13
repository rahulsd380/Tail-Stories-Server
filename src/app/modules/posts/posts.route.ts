import express, { NextFunction, Request, Response } from "express";
// import auth from "../../middlewares/auth";
// import { UserRole } from "../auth/auth.constannts";
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

router.get("/", PostControllers.getAllPosts);
router.put("/:id", PostControllers.updatePost);
router.put("/edit-comment/:commentId", PostControllers.editComment);
router.delete("/:id", PostControllers.deletePost);
router.get("/:postId", PostControllers.getSinglePostById);
router.post("/:postId/upvote", PostControllers.upvotePost);
router.post("/:postId/downvote", PostControllers.downvotePost);
router.post('/:postId/comment', PostControllers.addComment);
router.get("/most-upvoted", PostControllers.getMostUpvotedPost);
router.delete("/:postId/comment/:commentId", PostControllers.deleteComment);


export const postRoutes = router;
