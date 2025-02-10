import { Router } from "express";
import authenticateJWT  from "../middleware/jwtauth.js";
import { getAllGames, getUnitsFromGame } from "../controllers/videogameController.js";

const GameRoutes = Router();

GameRoutes.post('/getAllGames', authenticateJWT, getAllGames);
GameRoutes.post('/getAllUnitsFromGame', authenticateJWT, getUnitsFromGame);

export default GameRoutes;