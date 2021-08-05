import express from 'express';
import createBuckarooPayment from '../controller/createBuckarooPayment.js';
import createorder from '../controller/createorder.js';
import paymentCallback from '../controller/paymentCallback.js';

const router = express.Router();

router.get("/createBuckarooPayment", createBuckarooPayment);
router.get("/createorder", createorder);
router.get("/paymentCallback", paymentCallback);
// router.get("/payments/:paymentId", getPayment);

export default router;