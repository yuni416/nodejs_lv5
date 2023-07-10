"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Users, {
        targetKey: "userId",
        foreignKey: "UserId",
      });
      this.belongsTo(models.Users, {
        targetKey: "nickname",
        foreignKey: "Nickname",
      });
      this.hasMany(models.Comments, {
        sourceKey: "postId",
        foreignKey: "PostId",
      });
      this.hasMany(models.Likes, {
        sourceKey: "postId",
        foreignKey: "PostId",
      });
    }
  }
  Posts.init(
    {
      UserId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Nickname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      postId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.fn("now"),
      },
    },
    {
      sequelize,
      modelName: "Posts",
    }
  );
  return Posts;
};
