"use strict";

const moment = require("moment");

const table = "cities";
const cityName = "Peshawar";
const fk_country_id = 1;
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
      fk_country_id: {
        type: Sequelize.INTEGER,
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
      `INSERT INTO ${table} (name, fk_country_id, createdAt, updatedAt) VALUES ('${cityName}',${fk_country_id}, ${createdAt}, ${updatedAt})`
    );
  },
  down: async function (queryInterface) {
    return queryInterface.dropTable(table);
  },
};
