var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
import * as User from '../../../user/User';

function localStrategyConfig() {

  passport.use(new LocalStrategy({ usernameField: 'name' },
    function(username, password, done) {
      User.findOne({ name: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (user.password != password) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    })
    );
}

export = localStrategyConfig;
