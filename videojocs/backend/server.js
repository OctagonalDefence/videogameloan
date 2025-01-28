import express from 'express';
import cors from 'cors';

import userRoutes from './routes/userRoutes.js';
import gameRoutes from './routes/gameRoutes.js';

import dotenv from 'dotenv';

const IP = 'localhost';

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/games', gameRoutes);

app.listen(dotenv.PORT, IP, () => {
    console.log(`Server is running on http://${IP}:${dotenv.PORT}`);
});


