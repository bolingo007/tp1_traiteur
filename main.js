const path = require('path');
const express = require('express');
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
let session = require('express-session');
const PORT = 3000;
const moment = require('moment');
let baseDonnee = require('./src/model/db.js');
let passportMiddleware= require('./src/middleware/passeportDemo.js');
let passport   = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let route = require('./src/routes/pageBase.js');

app.set('view engine','pug');
app.use(express.static('public'));

// get et post: les deux lignes p
app.use(express.json());
app.use(express.urlencoded());

//session pour la sécurité
app.use(session({ secret: 'ffsd6556tgrtewr33r', cookie: { maxAge: 600000 }}));

// connexion à la base de données
app.use(passport.initialize());
app.use(passport.session());
passportMiddleware(passport, LocalStrategy);

app.use(route);

// accés aux données
/* ici async function acces () {
    try {
        await baseDonnee.sequelize.authenticate();
        console.log('Connexion établie avec succès.');
    } catch (error) {
        console.error('La connrexion database a échoué:', error);
    }
} */

(async () => {
    await baseDonnee.sequelize.sync({ force: false }); //force: false si l'on ne veut pas supprimer la tablde avant. force: true si l'on veut supprimer la table
})();

app.use(express.urlencoded({extended: true}));
// Server Start
app.listen(PORT, () =>{
    console.log(`Example app listening at http://localhost:${PORT}`);
});

//ici acces().then(()=> console.log('fin'));
//exécuter avec: node ./main.js