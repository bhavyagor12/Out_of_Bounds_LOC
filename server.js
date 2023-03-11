import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import sendMail from "./controllers/sendMail.js";


dotenv.config();

morgan("tiny");

const connect = () => {
  mongoose
    .connect(
      `mongodb+srv://bhavya_gor:${process.env.USERPASSWORD}@cluster0.kjdrvny.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() => {
      console.log("connected to db");
    })
    .catch((err) => {
      console.log(err);
    });
};

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

app.post("/email", sendMail);

app.listen(8000, () => {
  connect();
  console.log("Server on");
});