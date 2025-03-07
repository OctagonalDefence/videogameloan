import sql from 'mssql';
import getPool from '../middleware/dbConnection.js';
import errorHandler from '../middleware/errorHandler.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const getAllUsers = async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request().query('SELECT * FROM Usuari');
    res.json(result.recordset);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

export const register = async (req, res) => {
  const { email, name, password } = req.body;

  try {
    const pool = await getPool();
    const checkUser = await pool.request()
      .input('email', sql.NVarChar, email)
      .query('SELECT Email FROM Usuari WHERE Email = @email');

    if (checkUser.recordset.length > 0) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.request()
      .input('email', sql.NVarChar, email)
      .input('name', sql.NVarChar, name)
      .input('password', sql.NVarChar, hashedPassword)
      .query('INSERT INTO Usuari (Email, Nom, Password, Tipus) VALUES (@email, @name, @password, 1)');
    res.json({ message: 'User registered' });
  } catch (error) {
    errorHandler(error, req, res);
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('username', sql.NVarChar, username)
      .query('SELECT Email, Password FROM Usuari WHERE Email = @username');

    if (result.recordset.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const user = result.recordset[0];
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