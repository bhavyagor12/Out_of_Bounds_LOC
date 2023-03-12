import express from "express";
import {
  checkoutFunction,
  validateCoupon,
  getCouponUI,
  getCouponsForUser,
} from "../controllers/Coupons.js";

const router = express.Router();
router.post("/checkout", checkoutFunction);
router.post("/validate", validateCoupon);
router.post("/getCoupons", getCouponsForUser);
router.post("/getCouponUI", getCouponUI);

export default router;
