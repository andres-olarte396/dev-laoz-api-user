const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const swaggerDocs = require('./config/swagger');

dotenv.config();
connectDB();

const app = express();
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/user', userRoutes);

swaggerDocs(app);

const PORT = process.env.LOCAL_PORT || 6000;
app.listen(PORT, () => {
  console.log(`User API running on port ${PORT}`);
});
