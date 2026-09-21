import express from "express";
import { ApplicationController } from "../controllers/Applications.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { applicationService } from "../services/index.js";

const { Router } = express;

export const applicationRouter = Router();

const controller = new ApplicationController(applicationService);

applicationRouter.get("/applications", authMiddleware, controller.getAllApplications);
applicationRouter.get("/applications/:id", authMiddleware, controller.getApplicationById);
applicationRouter.post("/applications", authMiddleware, controller.createApplication);
applicationRouter.put("/applications/:id", authMiddleware, controller.updateApplication);
applicationRouter.delete("/applications/:id", authMiddleware, controller.deleteApplication);