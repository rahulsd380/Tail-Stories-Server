import { Types } from "mongoose";

export type TReview = {
    user: Types.ObjectId; // User collection
    product: Types.ObjectId; // Product collection
    rating: number;
    comment: string;
    createdAt: Date;
};