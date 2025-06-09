import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

import userRoutes from './routes/usersRoutes.js';
import gameRoutes from './routes/gameRoutes.js';
import authenticateJWT from './middleware/jwtauth.js';
import loanRoutes from './routes/loanRoutes.js';

dotenv.config();
const app = express();
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  keyGenerator: (req) => req.headers.authorization || req.ip,
  message: { error: 'Too many requests, please try again later.' }
});

app.use('/api/v1/', apiLimiter);

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());


app.use('/api/v1/users', userRoutes);
app.use('/api/v1/games', authenticateJWT, gameRoutes);
app.use('/api/v1/loans', authenticateJWT, loanRoutes);

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>Videogame Loan API</title></head>
      <body>
        <h1>Videogame Loan API</h1>
        <ul>
          <li><b>Users:</b> /api/v1/users/register, /api/v1/users/login, /api/v1/users/getAllUsers</li>
          <li><b>Games:</b> /api/v1/games/getAllGames, /api/v1/games/getUnitsFromGame</li>
          <li><b>Loans:</b> /api/v1/loans/rentVideoGame, /api/v1/loans/returnVideoGame, /api/v1/loans/updateLoanDays, /api/v1/loans/getAllLoans, /api/v1/loans/getUserLoans</li>
        </ul>
      </body>
    </html>
  `);
});

app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
})

app.listen(process.env.PORT, process.env.DB_SERVER, () => {
  console.log(`Server is running on http://${process.env.DB_SERVER}:${process.env.PORT}`);
});