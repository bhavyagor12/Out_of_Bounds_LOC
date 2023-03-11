import express from "express";
import { checkoutFunction, validateCoupon } from "../controllers/Coupons.js";

const router = express.Router();
router.post("/checkout", checkoutFunction);
router.post("/validate", validateCoupon);
export default router;
