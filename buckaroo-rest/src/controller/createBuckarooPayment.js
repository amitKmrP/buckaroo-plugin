import axios from 'axios';
import express from 'express';
import dotenv from "dotenv";
import BuckarooHmac from "../PaymentAuthentication/auth.js";
import paymentRequestData from "./paymentRequestData.js";
import RequestIp from '@supercharge/request-ip';
import schema from '../schemas/orderSchema.js';
import uniquId from "uniqid";
import request from "http";
// import Buckaroo from 'buckaroo';


dotenv.config();
// Routes configuration
const createBuckarooPayment = express.Router();

// payment gateway confidentials
const requestUri = process.env.REQUEST_URI;
const apiBaseUri = process.env.API_BASE_ADDRESS;
const websiteKey = process.env.WEBSITE_KEY;
const secretKey = process.env.SECRETE_KEY;


// const ipAdd=request.request();

// data initialization

let staticData = {
  "ClientIP": {
    "Type": 0,
    "Address": "223.187.142.198"
  },
  "ReturnURL": "https://google.com",
  "ReturnURLCancel": "https://google.com",
  "ReturnURLError": "https://google.com",
  "ReturnURLReject": "https://google.com",
  "Invoice": "kjhkj98798678hjkghjhg",
  "Description": "test",
  "Currency": "EUR",
  "Amount": 8.0,
  "AmountCredit": 9.0,
  "OriginalTransactionKey": "iuyui76758jhgkg",
  "OriginalTransactionReference": {
    "Type": "refrence",
    "Reference": "iuyui76758jhgkg"
  },
  "ContinueOnIncomplete": 0,
  "ClientUserAgent": "Chrome",
  "PushURL": "https://facebook.com",
  "PushURLFailure": "https://expressjs.com/",
  "Services": {
    "Global": [
      {
        "Name": "Transaction",
        "GroupType": "1",
        "GroupID": "123",
        "Value": "sample string 4"
      }
    ],
    "ServiceList": [
      {
        "Name": "AfterPay by Buckaroo",
        "Action": "Pay",
        "Version": 3,
        "Parameters": [
          {
            "Name": "sample string 1",
            "GroupType": "sample string 2",
            "GroupID": "sample string 3",
            "Value": "sample string 4"
          }
        ]
      },
      
    ]
  },
  "CustomParameters": {
    "List": [
      {
        "Name": "test",
        "Value": "sample string 2"
      }
    ]
  },
  "AdditionalParameters": {
    "List": [
      {
        "Name": "sample string 1",
        "Value": "sample string 2"
      },
      {
        "Name": "sample string 1",
        "Value": "sample string 2"
      }
    ]
  }
};

const postContent = staticData;
console.log(typeof postContent);
const httpMethod = Object.keys(postContent).length === 0 ? "GET" : "POST";

// Payment gateway Authentication 
const authHeader = BuckarooHmac.GetAuthHeader(requestUri, websiteKey, secretKey, postContent, httpMethod);

// createBuckarooPayment.get('/createBuckarooPayment', (req, res) => {
   axios.defaults.baseURL = apiBaseUri;
   axios.defaults.headers.common['Authorization'] = authHeader;
   axios.defaults.headers.post['Content-Type'] = 'application/json';

   // Payment gateway api test

   var resData;
   async function pay() {
      return await axios({
         method: httpMethod,         
         url: requestUri,
         data: postContent,
         timeout: 3000,
         responseType: 'json'
      }).then((response) => {
         console.log(response);
         resData = response;
      }).catch(error => {
         console.log(error);
         resData = error;
      });
   };
  pay();
  //  res.send(resData);
// });

export default createBuckarooPayment;