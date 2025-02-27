import sql from 'mssql';
import dbConfig from '../config/dbConfig.js';
import errorHandler from '../middleware/errorHandler.js';

export const getAllGames = async (req, res) => {
    try {
        let pool = await sql.connect(dbConfig);
        let result = await pool.request()
            .query(`SELECT Nom, Any_Publicacio, Unitats, Plataforma, Publicadora FROM Videojoc ORDER BY Any_Publicacio`);

        res.json(result.recordset);
    } catch (error) {
        errorHandler(error, req, res);
    }
};

export const getUnitsFromGame = async (req, res) => {
    const { gameID } = req.body;

    try {
        let pool = await sql.connect(dbConfig);
        let result = await pool.request()
            .input('gameID', sql.Int, gameID)
            .query(`SELECT Unitats FROM Videojoc WHERE Nom = @gameID`);

        res.json(result.recordset);
    } catch (error) {
        errorHandler(error, req, res);
    }
};

