"use strict";
const { DataTypes } = require("sequelize");
const table = "admin_otps";
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(table, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      otp: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      fk_admin_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "admins",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      expiry: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable(table);
  },
};
