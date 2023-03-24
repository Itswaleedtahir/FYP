"use strict";
const { DataTypes } = require("sequelize");
const table = "admins";
const moment = require("moment");
const name = "Umair Syed";
const email = "itsumairsyed@gmail.com";
const phone_number = "+923434548624";
const gender = "Male";
const createdAt = moment().unix();
const updatedAt = moment().unix();

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(table, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM("Male", "Female"),
        allowNull: false,
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
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
    await queryInterface.sequelize.query(
      `INSERT INTO ${table} (name, email, phone_number, gender, createdAt, updatedAt) VALUES ('${name}', '${email}', '${phone_number}','${gender}', ${createdAt}, ${updatedAt})`
    );
  },
  down: (queryInterface) => {
    return queryInterface.dropTable(table);
  },
};
