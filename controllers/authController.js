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
  signup: (req, res) => {
    res.status(200).json('signup');
  },
};
