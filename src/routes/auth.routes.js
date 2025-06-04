import express from "express";
import * as authController from "../controllers/auth.controller.js";
import * as authMiddleware from "../middlewares/auth.middleware.js";

const authRoutes = express.Router();

authRoutes.post('/register',
    authMiddleware.validateRegister,
    authController.registerUser);

authRoutes.post('/login',
    authMiddleware.validateLogin,
    authController.login);

authRoutes.get('/profile',
    authMiddleware.checkToken,
    authController.profileUser);

authRoutes.post('/refresh',
    authController.refresh);

authRoutes.patch('/change-password',
    authMiddleware.validateChangePassword,authMiddleware.checkToken,authController.changePassword);

authRoutes.delete('/logout',
    authMiddleware.checkToken,
    authController.logout);

export default authRoutes;
