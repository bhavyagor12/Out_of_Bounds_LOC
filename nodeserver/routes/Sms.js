import express from "express";
import { sendSms } from "../controllers/Sms.js";

const router = express.Router();
router.post("/sendSms", sendSms);

export default router;
