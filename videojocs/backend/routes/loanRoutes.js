import { Router } from "express";
import authenticateJWT  from "../middleware/jwtauth.js";
import { getAllLoans, rentVideoGame, returnVideoGame, getUserLoans, updateLoanDays } from "../controllers/loanController.js";

const loanRoutes = Router();

loanRoutes.get('/getAllLoans', authenticateJWT, getAllLoans);
loanRoutes.post('/rentVideoGame', authenticateJWT, rentVideoGame);
loanRoutes.post('/returnVideoGame', authenticateJWT, returnVideoGame);
loanRoutes.post('/getUserLoans', authenticateJWT, getUserLoans);
loanRoutes.post('/updateLoanDays', authenticateJWT, updateLoanDays);

export default loanRoutes;