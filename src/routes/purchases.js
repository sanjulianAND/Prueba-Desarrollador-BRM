const express = require("express");
const { check, validationResult } = require("express-validator");
const { createPurchase, getPurchases } = require("../controllers/purchases");
const clientAuth = require("../middlewares/client");

const router = express.Router();

router.post(
  "/",
  clientAuth,
  [
    check("products").isArray().notEmpty(),
    check("products.*.productId").isInt({ gt: 0 }),
    check("products.*.quantity").isInt({ gt: 0 }),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  createPurchase
);

router.get("/history", clientAuth, getPurchases);

module.exports = router;
