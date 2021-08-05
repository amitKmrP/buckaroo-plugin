import axios from 'axios';
import express from 'express';
import dotenv from "dotenv";
import BuckarooHmac from "../PaymentAuthentication/auth.js";
import paymentRequestData from "./paymentRequestData.js";
import RequestIp from '@supercharge/request-ip';
import schema from '../schemas/orderSchema.js';
import uniquId from "uniqid";
import request from "http";


// Routes configuration
const paymentCallback = express.Router();

paymentCallback.get('/paymentCallback', (req, res) => {
   
});
  export default paymentCallback;