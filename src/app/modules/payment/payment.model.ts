// src/models/User.model.ts

import mongoose, { Schema } from "mongoose";
import { TPayment } from "./payment.interface";

const PaymentSchema = new Schema<TPayment>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  amount: {
    type: String,
    required: true,
  },
  transactionId: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const Payment = mongoose.model<TPayment>("Payment", PaymentSchema);

export default Payment;
