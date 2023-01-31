"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Chapter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.cadet, {
        through: {
          model: "cadetChapter",
          unique: false,
        },
        constraints: false,
      });
      this.hasMany(models.post);
      this.hasMany(models.gitHubSubmission);
      this.belongsTo(models.section);
    }
  }
  Chapter.init(
    {
      name: DataTypes.STRING,
      chapterIndex: DataTypes.FLOAT,
      sectionId: {
        type: DataTypes.INTEGER,
        references: {
          model: "section",
          key: "id",
        },
      },
      markdownUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "chapter",
    }
  );
  return Chapter;
};
