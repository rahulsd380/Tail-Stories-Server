/* eslint-disable @typescript-eslint/no-explicit-any */
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { TUser } from '../auth/auth.interface';
import { User } from '../auth/auth.model';
import { Posts } from '../posts/product.model';

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
  await User.findOneAndUpdate(
    { _id: currentUserId, 'friendReq.received.friendId': userId },
    { $set: { 'friendReq.received.$.status': 'accepted' }, $addToSet: { friends: userId } },
    { new: true }
  );

  await User.findOneAndUpdate(
    { _id: userId, 'friendReq.sent.friendId': currentUserId },
    { $set: { 'friendReq.sent.$.status': 'accepted' }, $addToSet: { friends: currentUserId } },
    { new: true }
  );

  return { message: 'Friend request accepted' };
};

const declineFriendRequest = async (currentUserId: string, userId: string) => {
  await User.findOneAndUpdate(
    { _id: currentUserId, 'friendReq.received.friendId': userId },
    { $set: { 'friendReq.received.$.status': 'declined' } },
    { new: true }
  );

  await User.findOneAndUpdate(
    { _id: userId, 'friendReq.sent.friendId': currentUserId },
    { $set: { 'friendReq.sent.$.status': 'declined' } },
    { new: true }
  );

  return { message: 'Friend request declined' };
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
};
