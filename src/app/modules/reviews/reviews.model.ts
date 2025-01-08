import { model, Schema } from "mongoose";
import { TReview } from "./reviews.interface";

const reviewSchema = new Schema<TReview>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: [1, 'Rating must be at least 1'],
            max: [5, 'Rating cannot exceed 5'],
        },
        comment: {
            type: String,
            required: true,
            maxlength: [500, 'Comment cannot exceed 500 characters'],
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

const Review = model<TReview>('Review', reviewSchema);

export default Review;