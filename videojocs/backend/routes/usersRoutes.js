import { Router } from "express";
import authenticateJWT  from "../middleware/jwtauth.js";
import { getAllUsers, login } from "../controllers/userController.js";

const UserRoutes = Router();

UserRoutes.post('/getAllUsers', authenticateJWT, getAllUsers);
UserRoutes.post('/login', login);

export default UserRoutes;