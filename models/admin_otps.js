"use strict";
const moment = require("moment");
const table = "admin_otps";

module.exports = (sequelize, DataTypes) => {
  const AdminOtps = sequelize.define(table, {
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
  AdminOtps.beforeValidate((adminOtps) => {
    adminOtps.dataValues.expiry = moment().unix() + 300;
  });
  AdminOtps.beforeCreate((adminOtps) => {
    adminOtps.dataValues.createdAt = moment().unix();
    adminOtps.dataValues.updatedAt = moment().unix();
  });
  AdminOtps.beforeUpdate((adminOtps) => {
    adminOtps.dataValues.updatedAt = moment().unix();
  });
  return AdminOtps;
};
