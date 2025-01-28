import sql from 'mssql';
import dbConfig from '../config/dbConfig';
import errorHandler from '../middleware/errorHandler';


export const getAllGames = async (req, res) => {
    try {
        let pool = await sql.connect(dbConfig);
        let result = await pool.request()
        .query(`SELECT * FROM Games`);

        errorHandler(result, req, res);        

    } catch (error) {
        errorHandler(error, req, res);
    }
};

export const getUnitsFromGame = async (req, res) => {
    const { gameID } = req.body;

    try {
        let pool = await sql.connect(dbConfig);
        let result = await pool.request()
        .query(`SELECT * FROM Units WHERE gameID = ${gameID}`);

        errorHandler(result, req, res);

    } catch (error) {
        errorHandler(error, req, res);
    }
};