import sql from 'mssql';
import getPool from '../middleware/dbConnection.js';
import errorHandler from '../middleware/errorHandler.js';

export const getAllGames = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const sortBy = req.query.sortBy || 'Any_Publicacio';
    const order = req.query.order === 'desc' ? 'DESC' : 'ASC';

    const pool = await getPool();

    const countResult = await pool.request()
      .query('SELECT COUNT(*) as total FROM Videojoc');
    const total = countResult.recordset[0].total;

    const result = await pool.request()
      .query(`SELECT UID, Nom, Any_Publicacio, Unitats, Plataforma, Publicadora, anyCreacio
              FROM Videojoc
              ORDER BY ${sortBy} ${order}
              OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY`);

    res.json({
      data: result.recordset,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    });
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