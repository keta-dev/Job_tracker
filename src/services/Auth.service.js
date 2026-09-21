import { AppError } from "../helpers/errorHandlers.js";
import { hashPassword, signJWT } from "../helpers/utilities.js";
import { User } from "../models/User.model.js";
import { UserService } from "./User.service.js";

/**
 * @typedef {Object} RegistrationData
 * @property {string} username
 * @property {string} email
 * @property {string} password
 */

/**
 * @typedef {Object} LoginData
 * @property {string} email
 * @property {string} password
 */

export class AuthService {
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
  }

  /**
   * @private
   * @param {string} email
   * @returns {Promise<User | null>}
   */
  async #getUserByEmail(email) {
    return await User.findOne({
      where: { email },
      attributes: { exclude: ["passwordHash", "createdAt", "updatedAt"] },
    });
  }

  /**
   * @param {RegistrationData} data
   * @returns {Promise<User>}
   */
  async registerUser(data) {
    try {
      const { password, ...rest } = data;
      const hash = hashPassword(password);
      const user = await this.#userService.createUser({
        ...rest,
        passwordHash: hash,
      });
      if (user) {
        return await this.#getUserByEmail(rest.email);
      }

      throw new AppError(400, "Account creation failed");
    } catch (err) {
      if (err instanceof AppError) throw err;
      throw new AppError(500, "Something went wrong, try again.");
    }
  }

  /**
   * @param {LoginData} data
   */
  async login(data) {
    try {
      const { email, password } = data;
      const user = await User.findOne({ where: { email, isActive: true } });
      if (!user) throw new AppError(400, "Invalid email or password");

      const hash = hashPassword(password);
      if (hash !== user.passwordHash)
        throw new AppError(400, "Invalid email or password");

      const { id, isActive, role } = user.dataValues;
      const token = signJWT({ email, id, isActive, role });
      await user.update({ lastLoginAt: new Date() });
      const loggedInUser = await this.#getUserByEmail(email);

      return {
        accessToken: token,
        userData: loggedInUser.get(),
      };
    } catch (err) {
      if (err instanceof AppError) throw err;
      throw new AppError(500, "Something went wrong, try again.");
    }
  }
}