import sql from 'mssql';
import dbConfig from '../config/dbConfig.js';
import errorHandler from '../middleware/errorHandler.js';
import bcrypt from 'bcrypt';

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
            .query('SELECT * FROM Usuari WHERE Email = @username');

        if (result.recordset.length === 0) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const user = result.recordset[0];

        if (!user.password || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET);
        return res.json({ token });

    } catch (error) {
        errorHandler(error, req, res);
    }
};



