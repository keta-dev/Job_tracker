import express from "express";
import { UsersController } from "../controllers/Users.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { userService } from "../services/index.js";

const { Router } = express;

export const usersRouter = Router();

const controller = new UsersController(userService);

usersRouter.get("/users", authMiddleware, controller.getAllUsers);
usersRouter.get("/users/:id", authMiddleware, controller.getUserById);
usersRouter.post("/users", authMiddleware, controller.createUser);
usersRouter.put("/users/:id", authMiddleware, controller.updateUser);
usersRouter.delete("/users/:id", authMiddleware, controller.deleteUser);