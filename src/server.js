const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const swaggerDocs = require('./config/swagger');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();
connectDB();

const app = express();

// Seguridad HTTP headers
app.use(helmet());

// CORS seguro (ajusta origin según tus necesidades)
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  optionsSuccessStatus: 200
}));

// Rate limiting global (ajusta según tus necesidades)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 peticiones por IP
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/user', userRoutes);

swaggerDocs(app);

// Middleware centralizado de manejo de errores
app.use(errorHandler);

const PORT = process.env.LOCAL_PORT || 6000;
app.listen(PORT, () => {
  console.log(`User API running on port ${PORT}`);
});
