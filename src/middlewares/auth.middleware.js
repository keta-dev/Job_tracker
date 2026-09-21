import express from "express";
import { AppError } from "../helpers/errorHandlers.js";
import { verifyJWT } from "../helpers/utilities.js";

const { RequestHandler } = express;

/**
 * @type {RequestHandler}
 */
export function authMiddleware(req, _, next) {
  try {
    const authToken = req.headers.authorization;
    if (
      !authToken ||
      typeof authToken !== "string" ||
      !authToken.startsWith("Bearer ")
    )
      throw new AppError(401, "Authentication required");

    const token = authToken.split(" ", 2)[1];
    const payload = verifyJWT(token);
    req.authPayload = payload;
    next();
  } catch (err) {
    if (err instanceof AppError) throw err;
    throw new AppError(401, "Unauthorized, Invalid access token");
  }
}