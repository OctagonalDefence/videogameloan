import { Router } from "express";
import authenticateJWT  from "../middleware/jwtauth.js";
import { getAllGames, getUnitsFromGame } from "../controllers/videogameController.js";

const GameRoutes = Router();

GameRoutes.post('/getAllGames', getAllGames, authenticateJWT);
GameRoutes.post('/getAllUnitsFromGame', getUnitsFromGame, authenticateJWT);

export default GameRoutes;