let db = require('./db.js');

const Plat = db.sequelize.define('plat', {
    plat_id: {
        autoIncrement: true,
        primaryKey: true,
        type: db.Sequelize.INTEGER
    },
    nom: db.Sequelize.STRING(100),
    description: {type: db.Sequelize.TEXT, allowNull: false},
    options: db.Sequelize.STRING(50),
    prix: db.Sequelize.DECIMAL(5,2),
    actif: db.Sequelize.BOOLEAN,
    image: db.Sequelize.STRING(100)
});

module.exports = Plat;

