let User = require('../model/User.js');

module.exports = function(passport, Strategy) {

    passport.serializeUser(function(user, done) {
      done(null, user);
    });

    passport.deserializeUser(function(user, done) {
      done(null, user);
    });

  
    passport.use(new Strategy({

    },
    async function(username, password, done) {
        let user = await User.findOne(
            { where: {
              username: username,
              password: password
              }
            });
          if (user == null) {
            return done(null, false, { message: 'username ou mot de passe incorrect.' });
          }
          return done(null, user);
    }));
}
