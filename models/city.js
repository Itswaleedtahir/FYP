"use strict";
const moment = require("moment");

module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define("cities", {
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
    fk_country_id: {
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

  City.beforeCreate((city) => {
    city.dataValues.createdAt = moment().unix();
    city.dataValues.updatedAt = moment().unix();
  });
  City.beforeUpdate((city) => {
    city.dataValues.updatedAt = moment().unix();
  });
  return City;
};
