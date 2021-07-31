import express from 'express';
// import {createOrder,getPayment,paymentCallback} from '../controller/createBuckarooPayment.js';
 import createBuckarooPayment from '../controller/createBuckarooPayment.js';

const router = express.Router();

router.get("/createBuckarooPayment", createBuckarooPayment);
// router.get("/createorder", createOrder);
// router.post("/payment/callback", paymentCallback);
// router.get("/payments/:paymentId", getPayment);

export default router;