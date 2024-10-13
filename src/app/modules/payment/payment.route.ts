import express from "express";
import { PaymentControllers } from "./payment.controller";

const router = express.Router();

router.post("/create-payment", PaymentControllers.payment);
router.get("/payment-success", PaymentControllers.paymentConfirmationMessage);

export const PaymentRoutes = router;