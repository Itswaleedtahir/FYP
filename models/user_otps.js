"use strict";
const moment = require("moment");

module.exports = (sequelize, DataTypes) => {
  const UserOtp = sequelize.define("user_otps", {
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
    fk_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("Phone Number", "Email"),
      allowNull: false,
      defaultValue: "Phone Number",
    },
    expiry: {
      allowNull: false,
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

  UserOtp.beforeValidate((user_otp) => {
    user_otp.dataValues.expiry = moment().unix() + 300;
  });
  UserOtp.beforeCreate((user_otp) => {
    user_otp.dataValues.createdAt = moment().unix();
    user_otp.dataValues.updatedAt = moment().unix();
  });
  UserOtp.beforeUpdate((user_otp) => {
    user_otp.dataValues.updatedAt = moment().unix();
  });
  return UserOtp;
};
