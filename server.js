import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import smsRoutes from "./routes/Sms.js";
import admin from "firebase-admin";
import { firebase } from "./firebase.js";
import sendMail from "./controllers/sendMail.js";


dotenv.config();

morgan("tiny");
// const client = require("twilio")(accountSid, authToken);

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.get("/", (req, res) => {
  res.send("hello");
});
app.use("/api/sms", smsRoutes);
app.post("/email", sendMail);

app.listen(8000, () => {
  console.log("Server on");
});