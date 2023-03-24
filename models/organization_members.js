"use strict";
const moment = require("moment");
const table = "organization_members";
module.exports = (sequelize, DataTypes) => {
  const OrganizationMember = sequelize.define(table, {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    fk_user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    fk_organization_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    role: {
      allowNull: false,
      type: DataTypes.ENUM("Head", "Verifier", "Data Manager", "Member"),
    },
    joining_date: {
      allowNull: true,
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
  OrganizationMember.beforeCreate((organizationMember) => {
    organizationMember.dataValues.createdAt = moment().unix();
    organizationMember.dataValues.updatedAt = moment().unix();
  });
  OrganizationMember.beforeUpdate((organizationMember) => {
    organizationMember.dataValues.updatedAt = moment().unix();
  });
  return OrganizationMember;
};
