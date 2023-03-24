"use strict";
const moment = require("moment");
// const Post = require("../models/posts")

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("users", {
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
    username: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dob: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    blood_group: {
      type: DataTypes.ENUM("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"),
      allowNull: true,
    },
    gender: {
      type: DataTypes.ENUM("Male", "Female"),
      allowNull: true,
    },
    fk_city_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Eligible", "Not Eligible"),
      defaultValue: "Not Eligible",
      allowNull: false,
    },
    available: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    donations: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    received: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
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
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    email_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    phone_number_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
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

  User.beforeCreate((user) => {
    user.dataValues.createdAt = moment().unix();
    user.dataValues.updatedAt = moment().unix();
  });
  User.beforeUpdate((user) => {
    user.dataValues.updatedAt = moment().unix();
  });
  User.associate = (models) => {
    User.hasMany(models.Posts, {
      foreignKey: "fk_user_id",
      as: "posts",
    });
  };
  return User;
};
