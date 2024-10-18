/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from "../auth/auth.model";
import { TPayment } from "./payment.interface";
import Payment from "./payment.model";
import { initiatePayment, verifypayment } from "./payment.utils";

// Get all payments
const getAllPaymentHistories = async () => {
  const result = await Payment.find();
  return result;
}

// Make payment
const payment = async (payload: TPayment) => {
  const transactionId = `TNX-${Date.now()}-${payload.email}`;

  // Create a new payment record
  const payment = new Payment({
    name: payload.name,
    email: payload.email,
    phoneNumber: payload.phoneNumber,
    userId: payload.userId,
    amount: payload.amount,
    address: payload.address,
    transactionId,
  });
  await payment.save();

  // Update the isVerified field to true for the user
  await User.findByIdAndUpdate(payload.userId, { isVerified: true });

  // Initiate the payment process
  const paymentData = {
    transactionId,
    amount: payload.amount,
    name: payload.name,
    email: payload.email,
    phoneNumber: payload.phoneNumber,
    userId: payload.userId,
    address: payload.address,
  };

  const paymentSession = await initiatePayment(paymentData);
  return paymentSession;
};

// Payment confirmation message
const paymentConfirmation = async (transactionId: string, status: string) => {
  const verifyResponse = await verifypayment(transactionId);
  console.log(verifyResponse);
  
  let result;
  if (verifyResponse && verifyResponse.pay_status === "Successful") {
    result = await User.findOneAndUpdate(
      { transactionId },
      {
        isVerified: true,
      }
    );
  }

  return `<h1>Payment ${status}</h1>`;
};

export const PaymentServices = {
  payment,
  paymentConfirmation,
  getAllPaymentHistories,
};
