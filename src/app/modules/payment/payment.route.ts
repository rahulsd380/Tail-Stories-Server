import express from "express";
import { PaymentControllers } from "./payment.controller";

const router = express.Router();

router.get("/", PaymentControllers.getAllPaymentHistories);
router.post("/create-payment", PaymentControllers.payment);
router.post("/payment-success", PaymentControllers.paymentConfirmationMessage);

export const PaymentRoutes = router;