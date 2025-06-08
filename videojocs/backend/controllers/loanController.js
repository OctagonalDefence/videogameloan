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

    const dataFi = new Date();
    dataFi.setDate(dataFi.getDate() + days);

    await pool.request()
      .input('userID', sql.NVarChar, userID)
      .input('gameID', sql.NVarChar, gameID)
      .input('dataFi', sql.Date, dataFi)
      .query('INSERT INTO Prestem (Email_Usuari, Nom_Videojoc, Data_inici, Data_fi) VALUES (@userID, @gameID, GETDATE(), @dataFi)');

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
      .query('DELETE FROM Prestem WHERE Email_Usuari = @userID AND Nom_Videojoc = @gameID');
    res.json({ message: 'Videogame returned (deleted) successfully' });
  } catch (error) {
    errorHandler(error, req, res);
  }
};

export const updateLoanDays = async (req, res) => {
  const { loanId, days } = req.body;
  if (days > 14) return res.status(400).json({ error: 'Maximum 14 days' });

  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('loanId', sql.Int, loanId)
      .query('SELECT Data_inici FROM Prestem WHERE Codi = @loanId');
    if (!result.recordset.length) return res.status(404).json({ error: 'Loan not found' });

    const dataInici = result.recordset[0].Data_inici;
    const dataFi = new Date(dataInici);
    dataFi.setDate(dataFi.getDate() + days);

    await pool.request()
      .input('loanId', sql.Int, loanId)
      .input('dataFi', sql.Date, dataFi)
      .query('UPDATE Prestem SET Data_fi = @dataFi WHERE Codi = @loanId');
    res.json({ message: 'Loan updated' });
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

export const getUserLoans = async (req, res) => {
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