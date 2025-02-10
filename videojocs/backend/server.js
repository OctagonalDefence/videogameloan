import express from 'express';
import cors from 'cors';

import userRoutes from './routes/usersRoutes.js';
import gameRoutes from './routes/gameRoutes.js';
import authenticateJWT from './middleware/jwtauth.js';

import dotenv from 'dotenv';

const IP = 'localhost';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', authenticateJWT, userRoutes);
app.use('/api/games', authenticateJWT, gameRoutes);

app.listen(dotenv.PORT, IP, () => {
    console.log(`Server is running on http://${IP}:${dotenv.PORT}`);
});


