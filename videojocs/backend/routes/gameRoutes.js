import { Router } from "express";
import { authenticateJWT } from "../middleware/jwtauth.js";

const GameRoutes = Router();

GameRoutes.post('/getAllGames', getGames, authenticateJWT);
GameRoutes.post('/getAllUnitsFromGame', getUnitsFromGame, authenticateJWT);

export default GameRoutes;