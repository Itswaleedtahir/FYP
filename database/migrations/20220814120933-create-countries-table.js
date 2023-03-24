"use strict";

const moment = require("moment");

const table = "countries";
const countryName = "Pakistan";
const createdAt = moment().unix();
const updatedAt = moment().unix();

module.exports = {
  up: async function (queryInterface, Sequelize) {
    await queryInterface.createTable(table, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
    });

    await queryInterface.sequelize.query(
      `INSERT INTO ${table} (name, createdAt, updatedAt) VALUES ('${countryName}', ${createdAt}, ${updatedAt})`
    );
  },
  down: async function (queryInterface) {
    return queryInterface.dropTable(table);
  },
};
