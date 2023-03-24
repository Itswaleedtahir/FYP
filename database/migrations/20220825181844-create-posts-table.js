"use strict";
const { DataTypes } = require("sequelize");
const table = "posts";

module.exports = {
  up: function (queryInterface) {
    return queryInterface.createTable(table, {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      patient_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      attendant_contact: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fk_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      blood_group: {
        type: DataTypes.ENUM("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"),
        allowNull: false,
      },
      number_of_bags: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      exchange_possible: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      location: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      lat: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lng: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("Pending", "Confirmed", "Done", "Closed"),
        allowNull: false,
        defaultValue: "Pending",
      },
      patient_age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      attendant_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      transport_availability: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      time_limit: {
        type: DataTypes.ENUM(
          "Urgent",
          "12 hours",
          "24 hours",
          "2 days",
          "3 days",
          "1 week"
        ),
        allowNull: false,
      },
      verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable(table);
  },
};
