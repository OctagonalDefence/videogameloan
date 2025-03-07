import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from './routes/usersRoutes.js';
import gameRoutes from './routes/gameRoutes.js';
import authenticateJWT from './middleware/jwtauth.js';
import loanRoutes from './routes/loanRoutes.js';

dotenv.config();
const app = express();

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/games', authenticateJWT, gameRoutes);
app.use('/api/loans', authenticateJWT, loanRoutes);

app.listen(process.env.PORT, process.env.DB_SERVER, () => {
  console.log(`Server is running on http://${process.env.DB_SERVER}:${process.env.PORT}`);
});