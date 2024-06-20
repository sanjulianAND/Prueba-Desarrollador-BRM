"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Purchase extends Model {
    static associate(models) {
      Purchase.belongsTo(models.User, { foreignKey: "userId" });
      Purchase.hasMany(models.PurchaseDetail, { foreignKey: "purchaseId" });
    }
  }

  Purchase.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        allowNull: false,
      },
      totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Purchase",
    }
  );

  return Purchase;
};
