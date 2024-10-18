import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { PostServices } from './posts.services';

const createPost = catchAsync(async (req, res) => {
  const files = Array.isArray(req.files) ? req.files : [];
    const result = await PostServices.createPost(req.body, files);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post added successfully',
    data: result,
  });
});

const getMostUpvotedPost = catchAsync(async (req, res) => {
  const result = await PostServices.getMostUpvotedPost();

  if (!result) {
    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: false,
      message: 'No posts found.',
      data: null,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Most upvoted post retrieved successfully',
    data: result,
  });
});

const getAllPosts = catchAsync(async (req, res) => {
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
  const files = Array.isArray(req.files) ? req.files : [];
  console.log(files);
  const { postId } = req.params;
  const result = await PostServices.updatePost(postId, req.body, files);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post updated successfully',
    data: result,
  });
});

const deletePost = catchAsync(async (req, res) => {
  const { postId } = req.params;
  const result = await PostServices.deletePost(postId);

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
  const result = await PostServices.addComment(postId, authorId, comment);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment added successfully',
    data: result,
  });
});

// Edit comment
const editComment = catchAsync(async (req, res) => {
  // const userId = req.user.userId;
  const { commentId } = req.params;
  const result = await PostServices.editComment(commentId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment updated successfully',
    data: result,
  });
});

// Delete comment
const deleteComment = catchAsync(async (req, res) => {
  const { postId, commentId } = req.params;
  const result = await PostServices.deleteComment(postId, commentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment deleted successfully',
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
  editComment,
  getMostUpvotedPost,
  deleteComment,
};
