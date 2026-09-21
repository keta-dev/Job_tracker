import express from "express";
import { AuthController } from "../controllers/Auth.controller.js";
import { authService } from "../services/index.js";

const { Router } = express;

export const authRouter = Router();

const controller = new AuthController(authService);

authRouter.post("/register", controller.signUp);
authRouter.post("/login", controller.login);