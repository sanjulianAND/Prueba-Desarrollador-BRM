const express = require("express");
const userRoutes = require("./users");
const productRoutes = require("./products");
const purchaseRoutes = require("./purchases");

const router = express.Router();

router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/purchases", purchaseRoutes);

module.exports = router;
