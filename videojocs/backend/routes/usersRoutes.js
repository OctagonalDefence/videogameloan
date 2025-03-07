import { Router } from "express";
import authenticateJWT  from "../middleware/jwtauth.js";
import { getAllUsers, login, register } from "../controllers/userController.js";

const UserRoutes = Router();

UserRoutes.post('/getAllUsers', authenticateJWT, getAllUsers);
UserRoutes.post('/login', login);
UserRoutes.post('/register', register);

export default UserRoutes;