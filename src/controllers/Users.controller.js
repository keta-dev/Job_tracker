import express from "express";
import { UserService } from "../services/User.service.js";
import { successResponse } from "../helpers/response.js";
import { AppError } from "../helpers/errorHandlers.js";
import { hashPassword } from "../helpers/utilities.js";

const { RequestHandler } = express;

export class UsersController {
  /**
   * @type {UserService}
   * @private
   */
  #userService;

  /**
   * @param {UserService} userService
   * @constructor
   */
  constructor(userService) {
    this.#userService = userService;

    this.getAllUsers = this.getAllUsers.bind(this);
    this.getUserById = this.getUserById.bind(this);
    this.createUser = this.createUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  /**
   * @type {RequestHandler}
   */
  async getAllUsers(req, res) {
    const users = await this.#userService.getUsers();
    successResponse(res, users, "Users retrieved successfully");
  }

  /**
   * @type {RequestHandler}
   */
  async getUserById(req, res) {
    const userId = req.params.id;
    if (userId && typeof userId === "string") {
      const user = await this.#userService.getUsers(userId);
      return successResponse(res, user, "User retrieved successfully");
    }

    throw new AppError(400, "parameter `id` is missing");
  }

  /**
   * @type {RequestHandler}
   */
  async createUser(req, res) {
    const { firstName, lastName, email, password } = req.body;
    if (firstName && lastName && email && password) {
      if (password.length >= 6) {
        const hash = hashPassword(password);
        const user = await this.#userService.createUser({
          email,
          firstName,
          lastName,
          passwordHash: hash,
        });

        return successResponse(res, user, "User created successfully", 201);
      }

      throw new AppError(400, "`password` too short, require >= 6 characters");
    }

    throw new AppError(400, "Invalid parameters");
  }

  /**
   * @type {RequestHandler}
   */
  async updateUser(req, res) {
    const updateData = req.body;
    const userId = req.params.id;
    if (
      (updateData.firstName || updateData.lastName) &&
      userId &&
      typeof userId === "string"
    ) {
      const user = await this.#userService.updateUser(userId, updateData);
      return successResponse(res, user, "User updated successfully");
    }

    throw new AppError(400, "Request body can't be empty");
  }

  /**
   * @type {RequestHandler}
   */
  async deleteUser(req, res) {
    const userId = req.params.id;
    if (userId && typeof userId === "string") {
      const user = await this.#userService.deleteUser(userId);
      return successResponse(res, user, "User deleted successfully");
    }

    throw new AppError(400, "parameter `id` is missing");
  }
}