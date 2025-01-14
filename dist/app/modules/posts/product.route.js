"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRoutes = void 0;
const express_1 = __importDefault(require("express"));
// import auth from "../../middlewares/auth";
// import { UserRole } from "../auth/auth.constannts";
const product_controller_1 = require("./product.controller");
// import { upload } from "../../utils/sendImageToCloudinary";
const multer_config_1 = require("../../config/multer.config");
const router = express_1.default.Router();
router.post("/create-post", multer_config_1.multerUpload.array("files", 10), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, product_controller_1.PostControllers.createPost);
router.get("/", product_controller_1.PostControllers.getAllPosts);
router.put("/edit-post/:postId", multer_config_1.multerUpload.array("files", 10), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, product_controller_1.PostControllers.updatePost);
router.put("/edit-comment/:commentId", product_controller_1.PostControllers.editComment);
router.delete("/delete-post/:postId", product_controller_1.PostControllers.deletePost);
router.get("/:postId", product_controller_1.PostControllers.getSinglePostById);
router.post("/:postId/upvote", product_controller_1.PostControllers.upvotePost);
router.post("/:postId/downvote", product_controller_1.PostControllers.downvotePost);
router.post("/:postId/comment", product_controller_1.PostControllers.addComment);
router.get("/most-upvoted", product_controller_1.PostControllers.getMostUpvotedPost);
router.delete("/:postId/comment/:commentId", product_controller_1.PostControllers.deleteComment);
exports.postRoutes = router;
