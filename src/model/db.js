const { Sequelize, Model, DataTypes } = require("sequelize");
let baseDonnee = {};

const sequelize = new Sequelize('traiteur', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb'
});

baseDonnee.sequelize = sequelize;
baseDonnee.Sequelize = Sequelize;

module.exports = baseDonnee;