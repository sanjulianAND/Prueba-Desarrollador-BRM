const { Product } = require("../models");
const logger = require("../utils/logger");

/**
 * @api {post} /products Create a new product
 * @apiName CreateProduct
 * @apiGroup Products
 * @apiPermission admin
 *
 * @apiBody {String} lotNumber Lot number of the product
 * @apiBody {String} name Name of the product
 * @apiBody {Number} price Price of the product
 * @apiBody {Number} quantity Quantity of the product
 * @apiBody {String} entryDate Entry date of the product
 *
 * @apiSuccess {Object} product The created product
 * @apiSuccess {Number} product.id Product ID
 * @apiSuccess {String} product.lotNumber Lot number of the product
 * @apiSuccess {String} product.name Name of the product
 * @apiSuccess {Number} product.price Price of the product
 * @apiSuccess {Number} product.quantity Quantity of the product
 * @apiSuccess {String} product.entryDate Entry date of the product
 *
 * @apiError {String} message Error message
 */
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    logger.info(`Product created: ${product.id}`);
    res.status(201).json(product);
  } catch (error) {
    logger.error(`Error creating product: ${error.message}`);
    res.status(500).json({ message: "Error creating product", error });
  }
};

/**
 * @api {get} /products Get all products
 * @apiName GetProducts
 * @apiGroup Products
 * @apiPermission admin
 *
 * @apiSuccess {Object[]} products List of products
 * @apiSuccess {Number} products.id Product ID
 * @apiSuccess {String} products.lotNumber Lot number of the product
 * @apiSuccess {String} products.name Name of the product
 * @apiSuccess {Number} products.price Price of the product
 * @apiSuccess {Number} products.quantity Quantity of the product
 * @apiSuccess {String} products.entryDate Entry date of the product
 *
 * @apiError {String} message Error message
 */
const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    logger.info(`Fetched ${products.length} products`);
    res.status(200).json(products);
  } catch (error) {
    logger.error(`Error fetching products: ${error.message}`);
    res.status(500).json({ message: "Error fetching products", error });
  }
};

/**
 * @api {get} /products/:id Get product by ID
 * @apiName GetProductById
 * @apiGroup Products
 * @apiPermission admin
 *
 * @apiParam {Number} id Product ID
 *
 * @apiSuccess {Object} product The retrieved product
 * @apiSuccess {Number} product.id Product ID
 * @apiSuccess {String} product.lotNumber Lot number of the product
 * @apiSuccess {String} product.name Name of the product
 * @apiSuccess {Number} product.price Price of the product
 * @apiSuccess {Number} product.quantity Quantity of the product
 * @apiSuccess {String} product.entryDate Entry date of the product
 *
 * @apiError {String} message Error message
 */
const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      logger.warn(`Product not found: ${req.params.id}`);
      return res.status(404).json({ message: "Product not found" });
    }
    logger.info(`Fetched product: ${product.id}`);
    res.status(200).json(product);
  } catch (error) {
    logger.error(`Error fetching product: ${error.message}`);
    res.status(500).json({ message: "Error fetching product", error });
  }
};

/**
 * @api {put} /products/:id Update a product
 * @apiName UpdateProduct
 * @apiGroup Products
 * @apiPermission admin
 *
 * @apiParam {Number} id Product ID
 * @apiBody {String} [lotNumber] Lot number of the product
 * @apiBody {String} [name] Name of the product
 * @apiBody {Number} [price] Price of the product
 * @apiBody {Number} [quantity] Quantity of the product
 * @apiBody {String} [entryDate] Entry date of the product
 *
 * @apiSuccess {Object} product The updated product
 * @apiSuccess {Number} product.id Product ID
 * @apiSuccess {String} product.lotNumber Lot number of the product
 * @apiSuccess {String} product.name Name of the product
 * @apiSuccess {Number} product.price Price of the product
 * @apiSuccess {Number} product.quantity Quantity of the product
 * @apiSuccess {String} product.entryDate Entry date of the product
 *
 * @apiError {String} message Error message
 */
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      logger.warn(`Product not found: ${req.params.id}`);
      return res.status(404).json({ message: "Product not found" });
    }
    await product.update(req.body);
    logger.info(`Product updated: ${product.id}`);
    res.status(200).json(product);
  } catch (error) {
    logger.error(`Error updating product: ${error.message}`);
    res.status(500).json({ message: "Error updating product", error });
  }
};

/**
 * @api {delete} /products/:id Delete a product
 * @apiName DeleteProduct
 * @apiGroup Products
 * @apiPermission admin
 *
 * @apiParam {Number} id Product ID
 *
 * @apiSuccess {String} message Success message
 *
 * @apiError {String} message Error message
 */
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      logger.warn(`Product not found: ${req.params.id}`);
      return res.status(404).json({ message: "Product not found" });
    }
    await product.destroy();
    logger.info(`Product deleted: ${product.id}`);
    res.status(204).json();
  } catch (error) {
    logger.error(`Error deleting product: ${error.message}`);
    res.status(500).json({ message: "Error deleting product", error });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
