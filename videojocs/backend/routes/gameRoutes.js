import { Router } from "express";
import authenticateJWT  from "../middleware/jwtauth.js";
import { getAllGames, getUnitsFromGame } from "../controllers/videogameController.js";

const GameRoutes = Router();

GameRoutes.get('/getAllGames', authenticateJWT, getAllGames);
GameRoutes.get('/getUnitsFromGame', authenticateJWT, getUnitsFromGame);



export default GameRoutes;