let db = require('./db.js');

const User = db.sequelize.define('user', {
 
    user_id: {
        autoIncrement: true,
        primaryKey: true,
        type: db.Sequelize.INTEGER
    },

    firstname: {
        type: db.Sequelize.STRING,
        notEmpty: true
    },

    lastname: {
        type: db.Sequelize.STRING,
        notEmpty: true
    },

    username: {
        type: db.Sequelize.TEXT
    },

    about: {
        type: db.Sequelize.TEXT
    },

    email: {
        type: db.Sequelize.STRING,
        validate: {
            isEmail: true
        }
    },

    password: {
        type: db.Sequelize.STRING,
        allowNull: false
    },

    last_login: {
        type: db.Sequelize.DATE
    },

    status: {
        type: db.Sequelize.ENUM('active', 'inactive'),
        defaultValue: 'active'
    },

    type_compte: {
        type: db.Sequelize.STRING,
        allowNull: false
    }


});

module.exports = User;
 
