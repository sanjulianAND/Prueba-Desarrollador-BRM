const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("inventarioBD", "root", "root", {
  host: "127.0.0.1",
  dialect: "postgres",
  port: 5432,
});

module.exports = sequelize;
