/* eslint-disable @typescript-eslint/no-explicit-any */
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { TPost } from "./posts.interface";
import { Posts } from "./posts.model";

const createPost = async (payload: TPost, files: any[]) => {
  const { title, body, category } = payload;

  let imageUrls: string[] = [];

  // If files are provided, upload them to Cloudinary
  if (files && files.length > 0) {
    for (const file of files) {
      const imageName = `${payload?.title}-${Date.now()}`; // Give each image a unique name
      const path = file.path;

      // Upload each image to Cloudinary
      const { secure_url } = await sendImageToCloudinary(imageName, path);
      imageUrls.push(secure_url); // Store each image URL in the array
    }
  }

  const payloadData = {
    title: title || "",
    body: body || "",
    images: imageUrls, // Save the image URLs array
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

export const PostServices = {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
  getSinglePostById,
};
