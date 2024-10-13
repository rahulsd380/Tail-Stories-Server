import axios from "axios";
import config from "../../config";
import { TPayment } from "./payment.interface";

export const initiatePayment = async (paymentData: TPayment) => {
  const response = await axios.post(config.aamarpay_payment_url!, {
    store_id: config.aamarpay_store_id,
    signature_key: config.aamarpay_signature_key,
    tran_id: paymentData.transactionId,
    success_url: `http://localhost:5000/api/v1/payment/payment-success?transactionId=${paymentData.transactionId}&status=success`,
    fail_url: `http://localhost:5000/api/v1/payment/payment-success?status=failed`,
    cancel_url: "http://localhost:3000/",
    amount: paymentData.amount,
    currency: "BDT",
    desc: "Merchant Registration Payment",
    cus_name: paymentData.name,
    cus_email: paymentData.email,
    cus_add1: paymentData.address,
    cus_add2: "Mohakhali DOHS",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1206",
    cus_country: "Bangladesh",
    cus_phone: paymentData.phoneNumber,
    type: "json",
  });

  return response.data;
};

export const verifypayment = async (transactionId: string) => {
  const response = await axios.get(config.payment_verify_url!, {
    params: {
      store_id: config.aamarpay_store_id,
      signature_key: config.aamarpay_signature_key,
      type: "json",
      request_id: transactionId,
    },
  });

  return response.data;
};
