"use strict";
const moment = require("moment");

module.exports = (sequelize, DataTypes) => {
  const Country = sequelize.define("countries", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
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

  Country.beforeCreate(async (country) => {
    country.dataValues.createdAt = moment().unix();
    country.dataValues.updatedAt = moment().unix();
  });
  Country.beforeUpdate(async (country) => {
    country.dataValues.updatedAt = moment().unix();
  });

  return Country;
};
