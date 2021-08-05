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

var staticData = {
  "AmountDebit": 10.0,
  "Currency": "EUR",
  "Invoice": "BATCHA12455110000",
  "Description": "124551 BATCHA12455110000",
  "StartRecurrent": "True",
  "Culture": "nl-NL",
  "Services": {
     "ServiceList": [
        {
           "Name": "CreditManagement3",
           "Action": "CreateCombinedInvoice",
           "Parameters": [
              {
                 "Name": "InvoiceAmount",
                 "Value": "10.00"
              },
              {
                 "Name": "InvoiceDate",
                 "Value": "2020-02-10"
              },
              {
                 "Name": "DueDate",
                 "Value": "2020-10-03"
              },
              {
                 "Name": "SchemeKey",
                 "Value": "DefaultNone"
              },
              {
                 "Name": "Code",
                 "GroupType": "Debtor",
                 "Value": "JanVanPietersen123"
              }
           ]
        },
        {
           "Name": "SepaDirectDebit",
           "Action": "Pay",
           "Parameters": [
              {
                 "Name": "customeraccountname",
                 "Value": "John Smith"
              },
              {
                 "Name": "CustomerIBAN",
                 "Value": "NL32INGB00000XXXXX"
              },
              {
                 "Name": "CollectDate",
                 "Value": "2020-04-03"
              }
           ]
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
         timeout: 3000       
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