"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class PurchaseDetail extends Model {
    static associate(models) {
      PurchaseDetail.belongsTo(models.Purchase, { foreignKey: "purchaseId" });
      PurchaseDetail.belongsTo(models.Product, { foreignKey: "productId" });
    }
  }

  PurchaseDetail.init(
    {
      purchaseId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Purchases",
          key: "id",
        },
        allowNull: false,
      },
      productId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Products",
          key: "id",
        },
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "PurchaseDetail",
    }
  );

  return PurchaseDetail;
};
