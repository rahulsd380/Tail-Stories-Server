/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { TComment, TPost } from "./posts.interface";
import { Posts } from "./posts.model";

const createPost = async (payload: TPost, files: any[]) => {
  const { title, body, category } = payload;

  let imageUrls: string[] = [];

  // If files are provided, upload them to Cloudinary
  if (files && files.length > 0) {
    for (const file of files) {
      const imageName = `${payload?.title}-${Date.now()}`;
      const path = file.path;

      const { secure_url } = await sendImageToCloudinary(imageName, path);
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
    contentType: "free",
    status: 'published',
    createdAt: new Date(),
    authorId: payload.authorId,
  };

  const result = await Posts.create(payloadData);
  return result;
};

const getAllPosts = async () => {
  const result = await Posts.find();
  return result;
};

const getSinglePostById = async (postId: string) => {
  const result = await Posts.findById(postId);
  return result;
};

const updatePost = async (id: string, payload: Partial<TPost>) => {
  const result = await Posts.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deletePost = async (id: string) => {
  const result = await Posts.findByIdAndDelete(id);
  return result;
};

const upvotePost = async (postId: string, userId: string) => {
  const post = await Posts.findById(postId);

  if (!post) {
    throw new Error('Post not found');
  }

  // Check if user has already upvoted
  const hasUpvoted = post.upvotes.some((vote: any) => vote.userId === userId);
  const hasDownvoted = post.downvotes.some((vote: any) => vote.userId === userId);

  if (hasUpvoted) {
    // If the user has already upvoted, remove the upvote
    post.upvotes = post.upvotes.filter((vote: any) => vote.userId !== userId);
  } else if (hasDownvoted) {
    // If the user has downvoted, remove downvote first
    post.downvotes = post.downvotes.filter((vote: any) => vote.userId !== userId);
    // Then add upvote
    post.upvotes.push({ userId, votedAt: new Date() });
  } else {
    // Otherwise, simply add the upvote
    post.upvotes.push({ userId, votedAt: new Date() });
  }

  await post.save();
  return post;
};

const downvotePost = async (postId: string, userId: string) => {
  const post = await Posts.findById(postId);

  if (!post) {
    throw new Error('Post not found');
  }

  // Check if user has already downvoted
  const hasDownvoted = post.downvotes.some((vote: any) => vote.userId === userId);
  const hasUpvoted = post.upvotes.some((vote: any) => vote.userId === userId);

  if (hasDownvoted) {
    // If the user has already downvoted, remove the downvote
    post.downvotes = post.downvotes.filter((vote: any) => vote.userId !== userId);
  } else if (hasUpvoted) {
    // If the user has upvoted, remove upvote first
    post.upvotes = post.upvotes.filter((vote: any) => vote.userId !== userId);
    // Then add downvote
    post.downvotes.push({ userId, votedAt: new Date() });
  } else {
    // Otherwise, simply add the downvote
    post.downvotes.push({ userId, votedAt: new Date() });
  }

  await post.save();
  return post;
};

const addComment = async (
  postId: string,
  authorId: string,
  comment: string
): Promise<any> => {
  const post = await Posts.findById(postId);
  if (!post) {
    throw new AppError(httpStatus.NOT_FOUND, 'Post not found');
  }

  const newComment: TComment = {
    authorId,
    comment,
    commentedAt: new Date(),
    likes: 0,
  };

  // Adding the comment to the post
  post.comments.push(newComment);
  
  await post.save();

  return post;
};



export const PostServices = {
  createPost,
  getAllPosts,
  getSinglePostById,
  updatePost,
  deletePost,
  upvotePost,
  downvotePost,
  addComment
};
