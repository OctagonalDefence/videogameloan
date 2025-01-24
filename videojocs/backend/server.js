import express from 'express';
import cors from 'cors';

const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const sql = require('mssql');

const authRoutes = require('./middleware/jwtauth.js');
const { errorHandler } = require('./middleware/errorHandler.js');
const { authenticateJWT } = require('./middleware/jwtauth.js');

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

const dbConfig = {
  server: process.env.DB_SERVER || 'VICTUS\\SQL_ERIC',
  database: process.env.DB_DATABASE || 'videogameloans',
  options: {
    encrypt: true, 
    trustServerCertificate: true, 
  },
  authentication: {
    type: 'ntlm', 
    options: {
      domain: 'YOUR_WINDOWS_DOMAIN', 
      userName: '', 
      password: '', 
    },
  },
};

sql.connect(dbConfig)
  .then(() => {
    console.log('Connected to SQL Server');
  })
  .catch((err) => {
    console.error('Database connection failed:', err.message);
  });

app.use('/api/auth', authRoutes);

  app.get('/api/protected', authenticateJWT, (req, res) => {
    res.json({ message: 'You have access', user: req.user });
  });

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
