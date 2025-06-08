import { Router } from "express";
import { body } from "express-validator";
import authenticateJWT  from "../middleware/jwtauth.js";
import { getAllUsers, login, register } from "../controllers/userController.js";

const UserRoutes = Router();

UserRoutes.get('/getAllUsers', authenticateJWT, getAllUsers);
UserRoutes.post(
  '/register',
  [
    body('email').isEmail(),
    body('name').notEmpty(),
    body('password').isLength({ min: 6 })
  ],
  register
);

UserRoutes.post(
  '/login',
  [
    body('username').isEmail(),
    body('password').notEmpty()
  ],
  login
);

export default UserRoutes;