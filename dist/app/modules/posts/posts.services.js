"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const posts_model_1 = require("./posts.model");
const fs_1 = __importDefault(require("fs"));
const mongoose_1 = require("mongoose");
const createPost = (payload, files) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, body, category, contentType } = payload;
    const imageUrls = [];
    // If files are provided, upload them to Cloudinary
    if (files && files.length > 0) {
        for (const file of files) {
            const imageName = `${payload === null || payload === void 0 ? void 0 : payload.title}-${Date.now()}`;
            const path = file.path;
            const { secure_url } = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(imageName, path);
            imageUrls.push(secure_url);
        }
    }
    const payloadData = {
        title: title || "",
        body: body || "",
        images: imageUrls,
        upvotes: [],
        downvotes: [],
        comments: [],
        category: category || "",
        contentType: contentType || "free",
        status: 'published',
        createdAt: new Date(),
        authorId: payload.authorId,
    };
    const result = yield posts_model_1.Posts.create(payloadData);
    return result;
});
const getAllPosts = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield posts_model_1.Posts.find().populate('authorId');
    return result;
});
const getMostUpvotedPost = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield posts_model_1.Posts.find().sort({ "upvotes.length": -1 });
    return result;
});
const getSinglePostById = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield posts_model_1.Posts.findById(postId);
    return result;
});
const updatePost = (postId, payload, files) => __awaiter(void 0, void 0, void 0, function* () {
    const imageUrls = [];
    // If files are provided, upload them to Cloudinary
    if (files && files.length > 0) {
        for (const file of files) {
            const imageName = `${payload === null || payload === void 0 ? void 0 : payload.title}-${Date.now()}`;
            const path = file.path;
            const { secure_url } = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(imageName, path);
            imageUrls.push(secure_url);
            // Optionally delete the temp file after upload
            fs_1.default.unlinkSync(path);
        }
    }
    // Update the post with new data and image URLs
    const result = yield posts_model_1.Posts.findByIdAndUpdate(postId, Object.assign(Object.assign({}, payload), { images: imageUrls }), // Merge new image URLs with existing data
    { new: true, runValidators: true });
    return result;
});
const deletePost = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield posts_model_1.Posts.findByIdAndDelete(postId);
    return result;
});
const upvotePost = (postId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield posts_model_1.Posts.findById(postId);
    if (!post) {
        throw new Error('Post not found');
    }
    const objectUserId = new mongoose_1.Types.ObjectId(userId);
    const hasUpvoted = post.upvotes.some((vote) => vote.userId.equals(objectUserId));
    const hasDownvoted = post.downvotes.some((vote) => vote.userId.equals(objectUserId));
    if (hasUpvoted) {
        post.upvotes = post.upvotes.filter((vote) => !vote.userId.equals(objectUserId));
    }
    else if (hasDownvoted) {
        post.downvotes = post.downvotes.filter((vote) => !vote.userId.equals(objectUserId));
        post.upvotes.push({ userId: objectUserId, votedAt: new Date() });
    }
    else {
        post.upvotes.push({ userId: objectUserId, votedAt: new Date() });
    }
    yield post.save();
    return post;
});
const downvotePost = (postId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield posts_model_1.Posts.findById(postId);
    if (!post) {
        throw new Error('Post not found');
    }
    const objectUserId = new mongoose_1.Types.ObjectId(userId);
    const hasDownvoted = post.downvotes.some((vote) => vote.userId.equals(objectUserId));
    const hasUpvoted = post.upvotes.some((vote) => vote.userId.equals(objectUserId));
    if (hasDownvoted) {
        post.downvotes = post.downvotes.filter((vote) => !vote.userId.equals(objectUserId));
    }
    else if (hasUpvoted) {
        post.upvotes = post.upvotes.filter((vote) => !vote.userId.equals(objectUserId));
        post.downvotes.push({ userId: objectUserId, votedAt: new Date() });
    }
    else {
        post.downvotes.push({ userId: objectUserId, votedAt: new Date() });
    }
    yield post.save();
    return post;
});
const addComment = (postId, authorId, comment) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield posts_model_1.Posts.findById(postId);
    if (!post) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Post not found');
    }
    const newComment = {
        authorId,
        comment,
        commentedAt: new Date(),
        likes: 0,
    };
    post.comments.push(newComment);
    yield post.save();
    return post;
});
const editComment = (commentId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Step 1: Fetch the post containing the comment
    const post = yield posts_model_1.Posts.findById(payload.postId);
    // Step 2: Check if post exists
    if (!post) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Post not found');
    }
    // Step 3: Find the comment in the comments array
    const commentIndex = post.comments.findIndex(comment => comment._id.toString() === commentId);
    // Step 4: Check if the comment exists
    if (commentIndex === -1) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Comment not found');
    }
    // Step 5: Update the comment's fields based on the provided payload
    const commentToUpdate = post.comments[commentIndex];
    if (payload.comment !== undefined) {
        commentToUpdate.comment = payload.comment; // Update the comment text if provided
    }
    if (payload.likes !== undefined) {
        commentToUpdate.likes = payload.likes; // Update the likes count if provided
    }
    // Step 6: Save the updated post with the modified comment
    yield post.save();
    return post; // Return the updated post
});
const deleteComment = (postId, commentId) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield posts_model_1.Posts.findById(postId);
    if (!post) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Post not found');
    }
    // Find the index of the comment to delete
    const commentIndex = post.comments.findIndex(comment => comment._id.toString() === commentId);
    if (commentIndex === -1) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Comment not found');
    }
    // Remove the comment from the comments array
    post.comments.splice(commentIndex, 1);
    yield post.save();
    return post; // Return the updated post
});
exports.PostServices = {
    createPost,
    getAllPosts,
    getSinglePostById,
    updatePost,
    deletePost,
    upvotePost,
    downvotePost,
    addComment,
    editComment,
    getMostUpvotedPost,
    deleteComment,
};
