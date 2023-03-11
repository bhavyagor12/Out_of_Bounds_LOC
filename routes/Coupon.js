import express from "express";
import { checkoutFunction } from "../controllers/Coupons.js";

const router = express.Router();
router.post("/checkout", checkoutFunction);

export default router;
