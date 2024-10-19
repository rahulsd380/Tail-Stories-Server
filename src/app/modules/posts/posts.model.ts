import { Schema, model } from 'mongoose';
import { TComment, TPost, TVote } from './posts.interface';

const VoteSchema = new Schema<TVote>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  votedAt: { type: Date, required: true, default: Date.now },
});

const CommentSchema = new Schema<TComment>({
  authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  commentedAt: { type: Date, required: true, default: Date.now },
  comment: { type: String, required: true },
  likes: { type: Number, required: true, default: 0 },
});

const PostContentSchema = new Schema<TPost>({
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
  authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export const Posts = model<TPost>('Posts', PostContentSchema);
