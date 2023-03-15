const User = require('../models/User');
const passport = require('passport');

module.exports = {
  authStatus: (req, res) => {
    const { id, email, userName } = req.user;
    res.status(200).json({
      user: { id, email, userName },
    });
  },
  login: (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: 'Please complete all required fields.' });
    }

    passport.authenticate('local', (err, user, info) => {
      if (err) return next(err);

      if (!user) {
        return res.status(400).json({ error: 'Incorrect email or password.' });
      }

      req.logIn(user, (err) => {
        if (err) return next(err);
        res.status(200).json({
          user: { id: user.id, email: user.email, userName: user.userName },
        });
      });
    })(req, res, next);
  },
  logout: (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      req.session.destroy();
      res
        .status(200)
        .json({ success: true, message: 'Successfully logged out.' });
    });
  },
  signup: async (req, res, next) => {
    const { email, userName, password } = req.body;

    try {
      const user = await User.signup(email, userName, password);

      req.logIn(user, (err) => {
        if (err) return next(err);
        res.status(200).json({
          user: { id: user.id, email: user.email, userName: user.userName },
        });
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
