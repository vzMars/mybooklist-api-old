const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/database');
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/book');

// Load config
require('dotenv').config({ path: './config/.env' });

// Passport config
require('./config/passport')(passport);

// Enable CORS
app.use(cors(corsOptions));

// Database Connection
connectDB();

// Secure express app
app.use(helmet());

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Logging
app.use(morgan('dev'));

// Sessions
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE_URI }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
