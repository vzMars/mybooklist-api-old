const User = require('../models/User');
const passport = require('passport');

module.exports = {
  authStatus: (req, res) => {
    res.status(200).json('auth status');
  },
  login: (req, res) => {
    res.status(200).json('login');
  },
  logout: (req, res) => {
    res.status(200).json('logout');
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
