import { Router } from "express";
import authenticateJWT  from "../middleware/jwtauth.js";
import { getAllLoans, bookLoan, returnLoan } from "../controllers/loanController.js";

const loanRoutes = Router();

loanRoutes.post('/getAllLoans', authenticateJWT, getAllLoans);
loanRoutes.post('/bookLoan', authenticateJWT, bookLoan);
loanRoutes.post('/returnLoan', authenticateJWT, returnLoan);

export default loanRoutes;