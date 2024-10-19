/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { TComment, TPost } from "./posts.interface";
import { Posts } from "./posts.model";
import fs  from 'fs';
import { Types } from "mongoose";

const createPost = async (payload: TPost, files: any[]) => {
  const { title, body, category, contentType } = payload;

  const imageUrls: string[] = [];

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
    contentType: contentType || "free",
    status: 'published',
    createdAt: new Date(),
    authorId: payload.authorId,
  };

  const result = await Posts.create(payloadData);
  return result;
};

const getAllPosts = async () => {
  const result = await Posts.find().populate('authorId');
  return result;
};

const getMostUpvotedPost = async () => {
  const result = await Posts.find().sort({ "upvotes.length": -1 });
  return result;
};

const getSinglePostById = async (postId: string) => {
  const result = await Posts.findById(postId);
  return result;
};

const updatePost = async (postId: string, payload: Partial<TPost>, files: any[]) => {
  const imageUrls: string[] = [];

  // If files are provided, upload them to Cloudinary
  if (files && files.length > 0) {
    for (const file of files) {
      const imageName = `${payload?.title}-${Date.now()}`;
      const path = file.path;

      const { secure_url } = await sendImageToCloudinary(imageName, path);
      imageUrls.push(secure_url);

      // Optionally delete the temp file after upload
      fs.unlinkSync(path);
    }
  }


  // Update the post with new data and image URLs
  const result = await Posts.findByIdAndUpdate(
    postId,
    { ...payload, images: imageUrls }, // Merge new image URLs with existing data
    { new: true, runValidators: true }
  );
  return result;
};


const deletePost = async (postId: string) => {
  const result = await Posts.findByIdAndDelete(postId);
  return result;
};

const upvotePost = async (postId: string, userId: string) => {
  const post = await Posts.findById(postId);

  if (!post) {
    throw new Error('Post not found');
  }

  const objectUserId = new Types.ObjectId(userId);

  const hasUpvoted = post.upvotes.some((vote: any) => vote.userId.equals(objectUserId));
  const hasDownvoted = post.downvotes.some((vote: any) => vote.userId.equals(objectUserId));

  if (hasUpvoted) {
    post.upvotes = post.upvotes.filter((vote: any) => !vote.userId.equals(objectUserId));
  } else if (hasDownvoted) {
    post.downvotes = post.downvotes.filter((vote: any) => !vote.userId.equals(objectUserId));
    post.upvotes.push({ userId: objectUserId, votedAt: new Date() });
  } else {
    post.upvotes.push({ userId: objectUserId, votedAt: new Date() });
  }

  await post.save();
  return post;
};


const downvotePost = async (postId: string, userId: string) => {
  const post = await Posts.findById(postId);

  if (!post) {
    throw new Error('Post not found');
  }

  const objectUserId = new Types.ObjectId(userId);

  const hasDownvoted = post.downvotes.some((vote: any) => vote.userId.equals(objectUserId)); 
  const hasUpvoted = post.upvotes.some((vote: any) => vote.userId.equals(objectUserId));

  if (hasDownvoted) {
    post.downvotes = post.downvotes.filter((vote: any) => !vote.userId.equals(objectUserId));
  } else if (hasUpvoted) {
    post.upvotes = post.upvotes.filter((vote: any) => !vote.userId.equals(objectUserId));
    post.downvotes.push({ userId: objectUserId, votedAt: new Date() });
  } else {
    post.downvotes.push({ userId: objectUserId, votedAt: new Date() });
  }

  await post.save();
  return post;
};

const addComment = async (
  postId: string,
  authorId: Types.ObjectId,
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

  post.comments.push(newComment);
  
  await post.save();

  return post;
};

const editComment = async (commentId: string, payload: Partial<Omit<TComment, 'postId'> & { postId: string }>) => {
  // Step 1: Fetch the post containing the comment
  const post = await Posts.findById(payload.postId);
  
  // Step 2: Check if post exists
  if (!post) {
    throw new AppError(httpStatus.NOT_FOUND, 'Post not found');
  }

  // Step 3: Find the comment in the comments array
  const commentIndex = post.comments.findIndex(comment => comment._id!.toString() === commentId);

  // Step 4: Check if the comment exists
  if (commentIndex === -1) {
    throw new AppError(httpStatus.NOT_FOUND, 'Comment not found');
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
  await post.save();

  return post; // Return the updated post
};

const deleteComment = async (postId: string, commentId: string) => {
  const post = await Posts.findById(postId);
  if (!post) {
    throw new AppError(httpStatus.NOT_FOUND, 'Post not found');
  }

  // Find the index of the comment to delete
  const commentIndex = post.comments.findIndex(comment => comment._id!.toString() === commentId);
  if (commentIndex === -1) {
    throw new AppError(httpStatus.NOT_FOUND, 'Comment not found');
  }

  // Remove the comment from the comments array
  post.comments.splice(commentIndex, 1);
  await post.save();

  return post; // Return the updated post
};



export const PostServices = {
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
