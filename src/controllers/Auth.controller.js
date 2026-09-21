import express from "express";
import { AuthService } from "../services/Auth.service.js";
import { AppError } from "../helpers/errorHandlers.js";
import { successResponse } from "../helpers/response.js";

const { RequestHandler } = express;

export class AuthController {
  /**
   * @type {AuthService}
   * @private
   */
  #authService;

  constructor(authService) {
    this.#authService = authService;

    this.signUp = this.signUp.bind(this);
    this.login = this.login.bind(this);
  }

  /**
   * @type {RequestHandler}
   */
  async signUp(req, res) {
    const { username, email, password } = req.body;
    if (username && email && password) {
      if (password.length >= 6) {
        const user = await this.#authService.registerUser({
          username,
          email,
          password,
        });

        return successResponse(
          res,
          user.dataValues,
          "User created successfully",
          201,
        );
      }

      throw new AppError(400, "`password` too short, require >= 6 characters");
    }

    throw new AppError(400, "Invalid parameters");
  }

  /**
   * @type {RequestHandler}
   */
  async login(req, res) {
    const { email, password } = req.body;
    if (email && password) {
      const data = await this.#authService.login({ email, password });

      return successResponse(res, data, "Login successfully");
    }

    throw new AppError(400, "Invalid login credentials");
  }
}