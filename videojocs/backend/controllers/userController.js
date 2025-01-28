import sql from 'mssql';
import dbConfig from '../config/dbConfig';
import errorHandler from '../middleware/errorHandler';

export const getAllUsers = async (req, res) => {
    const { username, password } = req.body;
    
    const hashedPassword = bcrypt.hashSync(password, 10);
    
    try {
        let pool = await sql.connect(dbConfig);
        let result = await pool.request()
        .query(`SELECT * FROM Users'`);

        errorHandler(result, req, res);        

    } catch (error) {
        errorHandler(error, req, res);
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        let pool = await sql.connect(dbConfig);
        let result = await pool.request()
        .query(`SELECT * FROM Users WHERE username = ${username}`);

        errorHandler(result, req, res);

        if (result.recordset.length === 0) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const user = result.recordset[0];

        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET);
        res.json({ token });

    } catch (error) {
        errorHandler(error, req, res);
    }
};




