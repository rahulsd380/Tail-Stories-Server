import mongoose, { Schema } from "mongoose";
import { TRental } from "./rental.interface";

const rentalSchema = new Schema<TRental>({
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    bikeId: { type: Schema.Types.ObjectId, required: true, ref: 'Bike' },
    startTime: { type: Date, required: true },
    returnTime: { type: Date },
    totalCost: { type: Number, default: 0 },
    isReturned: { type: Boolean, default: false },
    isPaid : {type: Boolean, default: false},
  });
  
  export const Rental = mongoose.model<TRental>('Rental', rentalSchema);