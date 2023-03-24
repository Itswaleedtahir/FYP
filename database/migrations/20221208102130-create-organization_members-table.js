"use strict";
const { DataTypes } = require("sequelize");
const table = "organization_members";

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(table, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      fk_user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      fk_organization_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "organizations",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      role: {
        allowNull: false,
        type: DataTypes.ENUM("Head", "Verifier", "Data Manager", "Member"),
      },
      joining_date: {
        allowNull: true,
        type: DataTypes.INTEGER,
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
