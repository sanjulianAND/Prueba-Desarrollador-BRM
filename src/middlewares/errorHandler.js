const logger = require("../utils/logger");

const errorHandler = (err, req, res, next) => {
  logger.error(`${err.stack}`);
  res
    .status(500)
    .json({ message: "An unexpected error occurred", error: err.message });
};

module.exports = errorHandler;
