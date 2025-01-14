/* eslint-disable @typescript-eslint/no-explicit-any */
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { TUser } from '../auth/auth.interface';
import { User } from '../auth/auth.model';
import { Group } from '../groups/group.model';
import { Posts } from '../posts/product.model';

const getAllUser = async () => {
  const result = await User.find();
  return result;
};

const getMyPosts = async (authorId: string) => {
  const result = await Posts.find({ authorId });
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

const getSingleUserById = async (userId: string) => {
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
  const user = await User.findByIdAndUpdate(
    currentUserId,
    { $pull: { following: { userId: userId } } },
    { new: true }
  );

  const targetUser = await User.findByIdAndUpdate(
    userId,
    { $pull: { followers: { userId: currentUserId } } },
    { new: true }
  );

  return { user, targetUser };
};

const sendFriendRequest = async (currentUserId: string, userId: string) => {
  const user = await User.findByIdAndUpdate(
    currentUserId,
    { $addToSet: { 'friendReq.sent': { friendId: userId, status: 'pending' } } },
    { new: true }
  );

  const targetUser = await User.findByIdAndUpdate(
    userId,
    { $addToSet: { 'friendReq.received': { friendId: currentUserId, status: 'pending' } } },
    { new: true }
  );

  return { user, targetUser };
};

const acceptFriendRequest = async (currentUserId: string, userId: string) => {
  // Find and remove the received friend request from the current user's received requests
  const currentUser = await User.findByIdAndUpdate(
    currentUserId,
    {
      $pull: { 'friendReq.received': { friendId: userId } },
      $addToSet: { 'friends': userId } // Optionally add the user to the friends list
    },
    { new: true }
  );

  // Find and remove the sent friend request from the target user's sent requests
  const targetUser = await User.findByIdAndUpdate(
    userId,
    {
      $pull: { 'friendReq.sent': { friendId: currentUserId } },
      $addToSet: { 'friends': currentUserId } // Optionally add the current user to the friends list
    },
    { new: true }
  );

  // Check if both updates were successful
  if (!currentUser || !targetUser) {
    throw new Error('Error accepting friend request');
  }

  return { success: true, message: "Friend request accepted" };
};





const declineFriendRequest = async (currentUserId: string, userId: string) => {
  // Remove the friend request from the current user's received requests
  await User.findByIdAndUpdate(
    currentUserId,
    { $pull: { 'friendReq.received': { friendId: userId } } },
    { new: true }
  );

  // Remove the friend request from the target user's sent requests
  await User.findByIdAndUpdate(
    userId,
    { $pull: { 'friendReq.sent': { friendId: currentUserId } } },
    { new: true }
  );

  return { message: 'Friend request declined' };
};

const sharePost = async (currentUserId: string, postId: string) => {
  // Add postId to the user's sharedPosts array
  const user = await User.findByIdAndUpdate(
    currentUserId,
    { $addToSet: { sharedPosts: postId } },
    { new: true }
  );

  // Increment the totalShared field in the Post document
  const post = await Posts.findByIdAndUpdate(
    postId,
    { $inc: { totalShared: 1 } },
    { new: true }
  );

  if (!user || !post) {
    throw new Error('User or Post not found');
  }

  return {
    user,
    post,
  };
};

const joinGroup = async (currentUserId: string, groupId: string) => {
  const group = await Group.findByIdAndUpdate(
    groupId,
    { $addToSet: { members: currentUserId } },
    { new: true }
  );

  if (!group) {
    throw new Error('Group not found');
  }

  return group;
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
  sendFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
  sharePost,
  joinGroup,
};
