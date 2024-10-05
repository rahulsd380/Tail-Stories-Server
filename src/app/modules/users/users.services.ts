import { TUser } from './users.interface';
import { User } from './users.model';

const getAllUser = async () => {
  const result = await User.find();
  return result;
};

const getMe = async (userId: string) => {
  const result = await User.findById(userId);
  return result;
};

const updateProfile = async (id: string, payload: Partial<TUser>) => {
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

export const UserServices = {
  getAllUser,
  getMe,
  updateProfile,
  deleteUser,
  changeUserRoleToAdmin,
  changeUserRoleToUser,
};
