const express = require('express');
const app = express();
const passport = require('passport');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/database');

// Load config
require('dotenv').config({ path: './config/.env' });

// Passport config
require('./config/passport')(passport);

// Enable CORS
app.use(cors(corsOptions));

// Database Connection
connectDB();

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
