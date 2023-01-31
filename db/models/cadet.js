"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cadet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.section, {
        through: {
          model: "cadetSection",
          unique: false,
        },
        constraints: false,
      });
      this.belongsToMany(models.chapter, {
        through: {
          model: "cadetChapter",
          unique: false,
        },
        constraints: false,
      });
      this.hasMany(models.cadetSection);
      this.hasMany(models.cadetChapter);
      this.hasMany(models.gitHubSubmission);
    }
  }
  Cadet.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      photoLink: DataTypes.STRING,
      class: DataTypes.STRING,
      admin: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "cadet",
    }
  );
  return Cadet;
};
