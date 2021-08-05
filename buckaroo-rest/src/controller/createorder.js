import axios from 'axios';
import express from 'express';
import dotenv from "dotenv";
import BuckarooHmac from "../PaymentAuthentication/auth.js";
import paymentRequestData from "./paymentRequestData.js";
import RequestIp from '@supercharge/request-ip';
import schema from '../schemas/orderSchema.js';
import uniquId from "uniqid";
import request from "http";

dotenv.config();
// Routes configuration
const createorder = express.Router();

createorder.get('/createorder', (req, res) => {
    var options = {
        amount: 5000, // amount in the smallest currency unit
        currency: "EUR",
        orderId: uniquId(),
      };
      res.send(options);
});

export default createorder;