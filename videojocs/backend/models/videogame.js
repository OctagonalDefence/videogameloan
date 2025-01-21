const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ensure you have a Sequelize setup file

const Videogame = sequelize.define('Videogame', {
  title: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  year: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  units: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = Videogame;
