'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DiaryEntry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DiaryEntry.init({
    content: DataTypes.STRING,
    date: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DiaryEntry',
  });
  return DiaryEntry;
};