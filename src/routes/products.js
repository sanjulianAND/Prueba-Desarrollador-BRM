const express = require("express");
const { check, validationResult } = require("express-validator");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");
const adminAuth = require("../middlewares/admin");

const router = express.Router();

router.post(
  "/",
  adminAuth,
  [
    check("lotNumber").isString().notEmpty(),
    check("name").isString().notEmpty(),
    check("price").isFloat({ gt: 0 }),
    check("quantity").isInt({ gt: 0 }),
    check("entryDate").isISO8601(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  createProduct
);

router.get("/", adminAuth, getProducts);
router.get("/:id", adminAuth, getProductById);
router.put(
  "/:id",
  adminAuth,
  [
    check("lotNumber").optional().isString(),
    check("name").optional().isString(),
    check("price").optional().isFloat({ gt: 0 }),
    check("quantity").optional().isInt({ gt: 0 }),
    check("entryDate").optional().isISO8601(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  updateProduct
);
router.delete("/:id", adminAuth, deleteProduct);

module.exports = router;
