import sql from 'mssql';
import getPool from '../middleware/dbConnection.js';
import errorHandler from '../middleware/errorHandler.js';

export const rentVideoGame = async (req, res) => {
  const { userID, gameID, days } = req.body;

  if (days > 14) {
    return res.status(400).json({ error: 'Maximum rental period is 14 days' });
  }

  try {
    const pool = await getPool();
    const result = await pool.request()
      .query('SELECT MAX(Codi) AS maxCodi FROM Prestem');

    const maxCodi = result.recordset[0].maxCodi || 0;
    const newCodi = maxCodi + 1;

    const dataFi = new Date();
    dataFi.setDate(dataFi.getDate() + days);

    await pool.request()
      .input('codi', sql.Int, newCodi)
      .input('userID', sql.NVarChar, userID)
      .input('gameID', sql.NVarChar, gameID)
      .input('dataFi', sql.Date, dataFi)
      .query('INSERT INTO Prestem (Codi, Email_Usuari, Nom_Videojoc, Data_inici, Data_fi) VALUES (@codi, @userID, @gameID, GETDATE(), @dataFi)');

    res.json({ message: 'Videogame rented successfully' });
  } catch (error) {
    errorHandler(error, req, res);
  }
};

export const returnVideoGame = async (req, res) => {
  const { userID, gameID } = req.body;

  try {
    const pool = await getPool();
    await pool.request()
      .input('userID', sql.NVarChar, userID)
      .input('gameID', sql.NVarChar, gameID)
      .query('UPDATE Prestem SET Data_fi = GETDATE() WHERE Email_Usuari = @userID AND Nom_Videojoc = @gameID AND Data_fi IS NULL');
    res.json({ message: 'Videogame returned successfully' });
  } catch (error) {
    errorHandler(error, req, res);
  }
};

export const getAllLoans = async (req, res) => {
  const { userID } = req.body;

  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('userID', sql.NVarChar, userID)
      .query('SELECT * FROM Prestem WHERE Email_Usuari = @userID');
    res.json(result.recordset);
  } catch (error) {
    errorHandler(error, req, res);
  }
};