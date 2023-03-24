"use strict";
const moment = require("moment");

module.exports = (sequelize, DataTypes) => {
  const Organization = sequelize.define("organizations", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("Welfare"),
      allowNull: false,
      defaultValue: "Welfare",
    },
    registration_no: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
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
  Organization.beforeCreate((organization) => {
    organization.dataValues.createdAt = moment().unix();
    organization.dataValues.updatedAt = moment().unix();
  });
  Organization.beforeUpdate((organization) => {
    organization.dataValues.updatedAt = moment().unix();
  });
  return Organization;
};
