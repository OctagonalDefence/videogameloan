import sql from 'mssql';
import dbConfig from '../config/dbConfig.js';
import errorHandler from '../middleware/errorHandler.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const token = jwt.sign({ username: user.Email }, process.env.JWT_SECRET);

export const getAllUsers = async (req, res) => {
    try {
        let pool = await sql.connect(dbConfig);
        let result = await pool.request().query('SELECT * FROM Usuari');
        res.json(result.recordset);
    } catch (error) {
        errorHandler(error, req, res);
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        let pool = await sql.connect(dbConfig);
        let result = await pool.request()
            .input('username', sql.NVarChar, username)
            .query('SELECT Email, Password FROM Usuari WHERE Email = @username');

        if (result.recordset.length === 0) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const user = result.recordset[0];

        console.log('Password:', password);
        console.log('User Password:', user.Password);

        const isPasswordValid = await bcrypt.compare(password, user.Password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const token = jwt.sign({ username: user.Email }, process.env.JWT_SECRET);
        return res.json({ token });

    } catch (error) {
        errorHandler(error, req, res);
    }
};