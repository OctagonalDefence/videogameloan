import sql from 'mssql';
import dbConfig from '../config/dbConfig.js';
import errorHandler from '../middleware/errorHandler.js';

export const getAllLoans = async (req, res) => {
    try {
        let pool = await sql.connect(dbConfig);
        let result = await pool.request()
        .query(`SELECT * FROM Loans`);

        errorHandler(result, req, res);        

    } catch (error) {
        errorHandler(error, req, res);
    }
}

export const bookLoan = async (req, res) => {
    const { userId, gameId, loanDate, returnDate } = req.body;

    try {
        let pool = await sql.connect(dbConfig);
        let result = await pool.request()
        .input('userId', sql.Int, userId)
        .input('gameId', sql.Int, gameId)
        .input('loanDate', sql.Date, loanDate)
        .input('returnDate', sql.Date, returnDate)
        .query(`INSERT INTO Loans (userId, gameId, loanDate, returnDate) VALUES (@userId, @gameId, @loanDate, @returnDate)`);

        errorHandler(result, req, res);

    } catch (error) {
        errorHandler(error, req, res);
    }
}

export const returnLoan = async (req, res) => {
    const { userId, gameId } = req.body;

    try {
        let pool = await sql.connect(dbConfig);
        let result = await pool.request()
        .input('userId', sql.Int, userId)
        .input('gameId', sql.Int, gameId)
        .query(`DELETE FROM Loans WHERE userId = @userId AND gameId = @gameId`);

        errorHandler(result, req, res);

    } catch (error) {
        errorHandler(error, req, res);
    }
}