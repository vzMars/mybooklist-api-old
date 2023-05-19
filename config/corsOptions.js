const whitelist = [
  'https://mybooklist.vzmars.com',
  'https://www.mybooklist.vzmars.com',
];

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

module.exports = corsOptions;
