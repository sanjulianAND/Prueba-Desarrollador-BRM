const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const logger = require("../utils/logger");

const register = async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      password: hashedPassword,
      role,
    });
    logger.info(`User registered: ${user.id}`);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    logger.error(`Error registering user: ${error.message}`);
    res.status(500).json({ message: "Error registering user", error });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      logger.warn(`User not found: ${username}`);
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      logger.warn(`Invalid credentials for user: ${username}`);
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user.id, role: user.role },
      "inventario_secret_key",
      { expiresIn: "1h" }
    );
    logger.info(`User logged in: ${user.id}`);
    res.status(200).json({ token });
  } catch (error) {
    logger.error(`Error logging in: ${error.message}`);
    res.status(500).json({ message: "Error logging in", error });
  }
};

module.exports = { register, login };
