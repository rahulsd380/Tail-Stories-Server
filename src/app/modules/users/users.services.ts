/* eslint-disable @typescript-eslint/no-explicit-any */
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { TUser } from '../auth/auth.interface';
import { User } from '../auth/auth.model';
import { Posts } from '../posts/posts.model';

const getAllUser = async () => {
  const result = await User.find();
  return result;
};



const getMyPosts = async (authorId: string) => {
  const result = await Posts.find({authorId});
  return result;
};

const getMe = async (userId: string) => {
  const result = await User.findById(userId);
  return result;
};

const updateProfile = async (id: string, payload: Partial<TUser>, profilePic: any) => {
  let profilePicUrl: string | undefined;

  if (profilePic) {
    const imageName = `${id}-profile-${Date.now()}`;
    const path = profilePic.path;

    const { secure_url } = await sendImageToCloudinary(imageName, path);
    profilePicUrl = secure_url;
  }

  if (profilePicUrl) {
    payload.profilePicture = profilePicUrl;
  }

  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};



const changeUserRoleToAdmin = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  user.role = 'admin';
  await user.save();
  return user;
};

const changeUserRoleToUser = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  user.role = 'user';
  await user.save();
  return user;
};

const deleteUser = async (id: string) => {
  const result = await User.findByIdAndDelete(id);

  // id,
  // { isDeleted: true },
  // {
  //   new: true,
  // }
  return result;
};

const getSingleUserById = async (userId:string) => {
  const result = await User.findById(userId);
  return result;
};

const followUser = async (currentUserId: string, userId: string) => {
  const user = await User.findByIdAndUpdate(
    currentUserId,
    { $addToSet: { following: userId } },
    { new: true }
  );

  const targetUser = await User.findByIdAndUpdate(
    userId,
    { $addToSet: { followers: currentUserId } },
    { new: true }
  );

  return { user, targetUser };
};


const unfollowUser = async (currentUserId: string, userId: string) => {
  // Remove the target user from the current user's following list
  const user = await User.findByIdAndUpdate(
    currentUserId,
    { $pull: { following: { userId: userId } } },
    { new: true }
  );

  // Remove the current user from the target user's followers list
  const targetUser = await User.findByIdAndUpdate(
    userId,
    { $pull: { followers: { userId: currentUserId } } },
    { new: true }
  );

  return { user, targetUser };
};

export const UserServices = {
  getAllUser,
  getMe,
  updateProfile,
  deleteUser,
  changeUserRoleToAdmin,
  changeUserRoleToUser,
  getMyPosts,
  getSingleUserById,
  followUser,
  unfollowUser,
};
