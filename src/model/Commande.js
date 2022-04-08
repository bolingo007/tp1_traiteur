let db = require('./db.js');
let User = require('../model/User.js');
let Plat = require('../model/Plat.js');

const CommandeT = db.sequelize.define("commande", { //table de commandes
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: db.Sequelize.INTEGER
    },
    user_id: db.Sequelize.INTEGER,
    plat_id: db.Sequelize.INTEGER,
    portion: db.Sequelize.STRING(50),
    options: db.Sequelize.STRING(50),
    prix: db.Sequelize.DECIMAL(5,2),
    quantite: db.Sequelize.TINYINT(3),
    dans_panier: db.Sequelize.BOOLEAN  //passe à false lorsque la commande est payée et sortie du panier

});

module.exports = CommandeT;

User.hasMany(CommandeT, {foreignKey: 'user_id'});
CommandeT.belongsTo(User, {foreignKey: 'user_id'});

Plat.hasMany(CommandeT, {foreignKey: 'plat_id'});
CommandeT.belongsTo(Plat, {foreignKey: 'plat_id'});
