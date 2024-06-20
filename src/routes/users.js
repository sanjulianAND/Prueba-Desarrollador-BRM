const express = require("express");
const { check, validationResult } = require("express-validator");
const { register, login } = require("../controllers/users");

const router = express.Router();

/**
 * @api {post} /register Register a new user
 * @apiName RegisterUser
 * @apiGroup Users
 * @apiPermission none
 *
 * @apiBody {String} username Username of the user
 * @apiBody {String} password Password of the user (min 6 characters)
 * @apiBody {String="admin","client"} role Role of the user
 *
 * @apiSuccess {String} message Success message
 *
 * @apiError {Object[]} errors List of validation errors
 */
router.post(
  "/register",
  [
    check("username").isString().notEmpty(),
    check("password").isString().isLength({ min: 6 }),
    check("role").isIn(["admin", "client"]),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  register
);

/**
 * @api {post} /login Log in a user
 * @apiName LoginUser
 * @apiGroup Users
 * @apiPermission none
 *
 * @apiBody {String} username Username of the user
 * @apiBody {String} password Password of the user
 *
 * @apiSuccess {String} token JWT token for authentication
 *
 * @apiError {Object[]} errors List of validation errors
 * @apiError {String} message Error message
 */
router.post(
  "/login",
  [
    check("username").isString().notEmpty(),
    check("password").isString().notEmpty(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  login
);

module.exports = router;
