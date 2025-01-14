/* eslint-disable @typescript-eslint/no-explicit-any */
import { TGroup } from './group.interface';
import { Group } from './group.model';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';

const createGroup = async (payload: TGroup, logoFile: any, coverImageFile: any) => {
    let logoUrl = '';
    let coverImageUrl = '';
  
    if (logoFile) {
      const imageName = `${payload.name}-logo-${Date.now()}`;
      const { secure_url } = await sendImageToCloudinary(imageName, logoFile.path);
      logoUrl = secure_url;
    }
  
    if (coverImageFile) {
      const imageName = `${payload.name}-cover-${Date.now()}`;
      const { secure_url } = await sendImageToCloudinary(imageName, coverImageFile.path);
      coverImageUrl = secure_url;
    }
  
    const payloadData = {
      ...payload,
      logo: logoUrl,
      coverImage: coverImageUrl,
      createdAt: new Date(),
    };
  
    const result = await Group.create(payloadData);
    return result;
  };

const getAllGroups = async () => {
  const result = await Group.find();
  return result;
};

const getSingleGroup = async (groupId: string) => {
  const result = await Group.findById(groupId);
  return result;
};

const deleteGroup = async (groupId: string) => {
  await Group.findByIdAndDelete(groupId);
};

export const GroupServices = {
  createGroup,
  getAllGroups,
  getSingleGroup,
  deleteGroup,
};
