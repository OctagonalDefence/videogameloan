import { Router } from "express";
import authenticateJWT  from "../middleware/jwtauth.js";
import { getAllLoansFromUser, rentVideoGame, returnVideoGame } from "../controllers/loanController.js";

const loanRoutes = Router();

loanRoutes.post('/getAllLoans', authenticateJWT, getAllLoansFromUser);
loanRoutes.post('/rentVideoGame', authenticateJWT, rentVideoGame);
loanRoutes.post('/returnVideoGame', authenticateJWT, returnVideoGame);

export default loanRoutes;