"use strict";
const moment = require("moment");
const table = "admins";
module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define(table, {
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
  Admin.beforeCreate((admin) => {
    admin.dataValues.createdAt = moment().unix();
    admin.dataValues.updatedAt = moment().unix();
  });
  Admin.beforeUpdate((admin) => {
    admin.dataValues.updatedAt = moment().unix();
  });
  return Admin;
};
