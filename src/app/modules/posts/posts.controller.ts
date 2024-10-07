import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { PostServices } from './posts.services';

const createPost = catchAsync(async (req, res) => {
  console.log(req.files);
  const files = req.files;
  const result = await PostServices.createPost(req.body, files);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post added successfully',
    data: result,
  });
});

const getAllPosts = catchAsync(async (req, res) => {
  console.log(req.cookies);
  const result = await PostServices.getAllPosts();

  if (result.length === 0 || result.length === undefined) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: false,
      message: 'No posts found.',
      data: result,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Posts retrieved successfully',
    data: result,
  });
});

// Get single post by ID
const getSinglePostById = catchAsync(async (req, res) => {
  const { postId } = req.params;
  const result = await PostServices.getSinglePostById(postId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post fetched successfully.',
    data: result,
  });
});

const updatePost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PostServices.updatePost(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post updated successfully',
    data: result,
  });
});

const deletePost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PostServices.deletePost(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post deleted successfully',
    data: result,
  });
});

// Upvote
const upvotePost = catchAsync(async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;
  const result = await PostServices.upvotePost(postId, userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post upvoted successfully',
    data: result,
  });
});


// Downvote
const downvotePost = catchAsync(async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

  const result = await PostServices.downvotePost(postId, userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post downvoted successfully',
    data: result,
  });
});

// Comment
const addComment = catchAsync(async (req, res) => {
  const { postId } = req.params;
  const { authorId, comment } = req.body;
  console.log(req.body);
  const result = await PostServices.addComment(postId, authorId, comment);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment added successfully',
    data: result,
  });
});

export const PostControllers = {
  createPost,
  getAllPosts,
  getSinglePostById,
  updatePost,
  deletePost,
  upvotePost,
  downvotePost,
  addComment,
};
