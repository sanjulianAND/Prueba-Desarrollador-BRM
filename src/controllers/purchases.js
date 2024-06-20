const { Purchase, PurchaseDetail, Product } = require("../models");
const logger = require("../utils/logger");

/**
 * @api {post} /purchases Create a new purchase
 * @apiName CreatePurchase
 * @apiGroup Purchases
 * @apiPermission client
 *
 * @apiBody {Object[]} products List of products to purchase
 * @apiBody {Number} products.productId ID of the product
 * @apiBody {Number} products.quantity Quantity of the product
 *
 * @apiSuccess {Object} purchase The created purchase
 * @apiSuccess {Number} purchase.id Purchase ID
 * @apiSuccess {Number} purchase.userId ID of the user
 * @apiSuccess {Number} purchase.totalPrice Total price of the purchase
 * @apiSuccess {String} purchase.date Date of the purchase
 *
 * @apiError {String} message Error message
 */
const createPurchase = async (req, res) => {
  const { products } = req.body;
  try {
    const purchase = await Purchase.create({
      userId: req.user.id,
      totalPrice: 0,
      date: new Date(),
    });

    let totalPrice = 0;

    for (let item of products) {
      const product = await Product.findByPk(item.productId);
      if (!product || product.quantity < item.quantity) {
        logger.warn(`Insufficient quantity for product ${item.productId}`);
        return res.status(400).json({
          message: `Insufficient quantity for product ${item.productId}`,
        });
      }

      await PurchaseDetail.create({
        purchaseId: purchase.id,
        productId: item.productId,
        quantity: item.quantity,
        price: product.price * item.quantity,
      });

      await product.update({ quantity: product.quantity - item.quantity });

      totalPrice += product.price * item.quantity;
    }

    await purchase.update({ totalPrice });

    logger.info(`Purchase created: ${purchase.id}`);
    res.status(201).json(purchase);
  } catch (error) {
    logger.error(`Error creating purchase: ${error.message}`);
    res.status(500).json({ message: "Error creating purchase", error });
  }
};

/**
 * @api {get} /purchases/history Get purchase history
 * @apiName GetPurchaseHistory
 * @apiGroup Purchases
 * @apiPermission client
 *
 * @apiSuccess {Object[]} purchases List of purchases
 * @apiSuccess {Number} purchases.id Purchase ID
 * @apiSuccess {Number} purchases.userId ID of the user
 * @apiSuccess {Number} purchases.totalPrice Total price of the purchase
 * @apiSuccess {String} purchases.date Date of the purchase
 *
 * @apiError {String} message Error message
 */
const getPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: PurchaseDetail,
          include: [Product],
        },
      ],
    });
    logger.info(
      `Fetched ${purchases.length} purchases for user ${req.user.id}`
    );
    res.status(200).json(purchases);
  } catch (error) {
    logger.error(`Error fetching purchases: ${error.message}`);
    res.status(500).json({ message: "Error fetching purchases", error });
  }
};

module.exports = { createPurchase, getPurchases };
