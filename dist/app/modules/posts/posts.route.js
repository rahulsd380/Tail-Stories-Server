"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRoutes = void 0;
const express_1 = __importDefault(require("express"));
// import auth from "../../middlewares/auth";
// import { UserRole } from "../auth/auth.constannts";
const posts_controller_1 = require("./posts.controller");
// import { upload } from "../../utils/sendImageToCloudinary";
const multer_config_1 = require("../../config/multer.config");
const router = express_1.default.Router();
router.post("/create-post", multer_config_1.multerUpload.array("files", 10), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, posts_controller_1.PostControllers.createPost);
router.get("/", posts_controller_1.PostControllers.getAllPosts);
router.put("/edit-post/:postId", multer_config_1.multerUpload.array("files", 10), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, posts_controller_1.PostControllers.updatePost);
router.put("/edit-comment/:commentId", posts_controller_1.PostControllers.editComment);
router.delete("/delete-post/:postId", posts_controller_1.PostControllers.deletePost);
router.get("/:postId", posts_controller_1.PostControllers.getSinglePostById);
router.post("/:postId/upvote", posts_controller_1.PostControllers.upvotePost);
router.post("/:postId/downvote", posts_controller_1.PostControllers.downvotePost);
router.post("/:postId/comment", posts_controller_1.PostControllers.addComment);
router.get("/most-upvoted", posts_controller_1.PostControllers.getMostUpvotedPost);
router.delete("/:postId/comment/:commentId", posts_controller_1.PostControllers.deleteComment);
exports.postRoutes = router;
