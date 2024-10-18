"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifypayment = exports.initiatePayment = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../../config"));
const initiatePayment = (paymentData) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.post(config_1.default.aamarpay_payment_url, {
        store_id: config_1.default.aamarpay_store_id,
        signature_key: config_1.default.aamarpay_signature_key,
        tran_id: paymentData.transactionId,
        success_url: `https://tail-stories-server.vercel.app/api/v1/payment/payment-success?transactionId=${paymentData.transactionId}&status=success`,
        fail_url: `https://tail-stories-server.vercel.app/api/v1/payment/payment-success?status=failed`,
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
});
exports.initiatePayment = initiatePayment;
const verifypayment = (transactionId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(config_1.default.payment_verify_url, {
        params: {
            store_id: config_1.default.aamarpay_store_id,
            signature_key: config_1.default.aamarpay_signature_key,
            type: "json",
            request_id: transactionId,
        },
    });
    return response.data;
});
exports.verifypayment = verifypayment;
