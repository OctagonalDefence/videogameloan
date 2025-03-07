import sql from 'mssql';
import getPool from '../middleware/dbConnection.js';
import errorHandler from '../middleware/errorHandler.js';

export const getAllGames = async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .query('SELECT UID, Nom, Any_Publicacio, Unitats, Plataforma, Publicadora FROM Videojoc ORDER BY Any_Publicacio');
    res.json(result.recordset);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

export const getUnitsFromGame = async (req, res) => {
  const { gameID } = req.body;

  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('gameID', sql.Int, gameID)
      .query('SELECT Unitats FROM Videojoc WHERE Nom = @gameID');
    res.json(result.recordset);
  } catch (error) {
    errorHandler(error, req, res);
  }
};