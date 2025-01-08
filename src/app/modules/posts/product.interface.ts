import { Types } from "mongoose";

export type TProduct = {
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  stock: number;
  images: { url: string }[];
  ratings: number;
  reviews: { userId: Types.ObjectId; reviewId: Types.ObjectId }[];
  createdAt: Date;
};