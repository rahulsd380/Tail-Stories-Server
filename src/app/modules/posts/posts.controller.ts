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

export const PostControllers = {
  createPost,
  getAllPosts,
  getSinglePostById,
  updatePost,
  deletePost,
};
