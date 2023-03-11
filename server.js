import express from "express";
import mongoose, { set } from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import smsRoutes from "./routes/Sms.js";
import couponRoutes from "./routes/Coupon.js";

import sendMail from "./controllers/sendMail.js";
import {
  getDatabase,
  ref,
  onValue,
  child,
  push,
  update,
} from "firebase/database";

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

app.get("/firebaseData", (req, res) => {
  const db = getDatabase();
  const starCountRef = ref(db, "user/");
  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    res.send(data);
    return;
  });
  res.send("error");
});

app.get("/addData", (req, res) => {
  const db = getDatabase();
  const postData = {
    author: "bhavya",
  };

  const newPostKey = push(child(ref(db), "user/data/")).key;
  const updates = {};
  updates["user/" + newPostKey] = postData;

  res.send(update(ref(db), updates));
});

app.use("/api/sms", smsRoutes);
app.post("/email", sendMail);

app.use("/api/coupon", couponRoutes);

app.listen(9000, () => {
  console.log("Server on");
});
