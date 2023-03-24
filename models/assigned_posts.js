const moment = require("moment");
module.exports = (sequelize, DataTypes) => {
  const AssignedPost = sequelize.define("assigned_posts", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    fk_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fk_post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    archived: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    reason: {
      type: DataTypes.TEXT,
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
  AssignedPost.beforeCreate((assignedPost) => {
    assignedPost.dataValues.createdAt = moment.unix();
    assignedPost.dataValues.updatedAt = moment.unix();
  });
  AssignedPost.beforeUpdate((assignedPost) => {
    assignedPost.dataValues.updatedAt = moment.unix();
  });
  return AssignedPost;
};
