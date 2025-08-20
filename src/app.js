const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const connectDB = require('../src/config/db');
const userRoutes = require('../src/routes/userRoutes');
const swaggerDocs = require('../src/config/swagger');
const errorHandler = require('../src/middleware/errorHandler');

dotenv.config();
connectDB();

const app = express();
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  optionsSuccessStatus: 200
}));
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/user', userRoutes);
swaggerDocs(app);
app.use(errorHandler);

module.exports = app;
