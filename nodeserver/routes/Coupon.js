import express from "express";
import {
  checkoutFunction,
  validateCoupon,
  getCouponUI,
  getCouponsForUser,
  getCouponsRules,
  validateCoupon2,
  getCouponsDisc,
} from "../controllers/Coupons.js";

const router = express.Router();
router.post("/checkout", checkoutFunction);
router.post("/validate", validateCoupon);
router.post("/getCouponsDisc", getCouponsDisc);
router.post("/getCoupons", getCouponsForUser);
router.post("/getCouponUI", getCouponUI);
router.post("/rules", getCouponsRules);
router.post("/dynamicrules", validateCoupon2);

export default router;
