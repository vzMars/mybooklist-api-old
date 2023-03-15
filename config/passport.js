const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

const options = {
  usernameField: 'email',
  passwordField: 'password',
};

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(options, async (email, password, done) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          return done(null, false);
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
          return done(null, false);
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      return done(err);
    }
  });
};
