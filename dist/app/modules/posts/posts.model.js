"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Posts = void 0;
const mongoose_1 = require("mongoose");
const VoteSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    votedAt: { type: Date, required: true, default: Date.now },
});
const CommentSchema = new mongoose_1.Schema({
    authorId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    commentedAt: { type: Date, required: true, default: Date.now },
    comment: { type: String, required: true },
    likes: { type: Number, required: true, default: 0 },
});
const PostContentSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    images: { type: [String], default: [] },
    upvotes: { type: [VoteSchema], default: [] },
    downvotes: { type: [VoteSchema], default: [] },
    status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
    contentType: { type: String, enum: ['free', 'premium'], required: true },
    comments: { type: [CommentSchema], default: [] },
    category: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    authorId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
});
exports.Posts = (0, mongoose_1.model)('Posts', PostContentSchema);
