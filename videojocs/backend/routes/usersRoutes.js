import { Router } from "express";
import { authenticateJWT } from "../middleware/jwtauth.js";

const UserRoutes = Router();

UserRoutes.post('/getAllUsers', getUsers);
UserRoutes.post('/login', getUsers, authenticateJWT);

export default UserRoutes;