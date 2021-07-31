import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';
import paymentRoute from './src/routes/paymentRoute.js';
const app = express();

mongoose
  .connect("mongodb://localhost:27017/paymentorder", {
    useFindAndModify: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("DB CONNECTED"))
  .catch(() => console.log("FAILED TO CONNET WITH DB"));

app.use(bodyParser.json());
app.use(cors());

app.use("/api", paymentRoute);

app.listen(5000, () => {
  console.log(`App is running at 5000 port`);
});