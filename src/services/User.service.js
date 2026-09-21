'use strict';

import { UserModel } from '../models/User.model.js';
import { AppError } from '../helpers/AppError.js';

/**
 * @typedef {Object} UserModelData
 * @property {string} username
 * @property {string} email
 * @property {string} passwordHash
 */

export class UserService {
    async getUsers() {
        try {
            const user = await UserModel.findAll({
                attributes: { exclude: ['passwordHash', 'lastLoginAt'] },
                where: { isActive: true },
            });
            return user.map(u => u.dataValues);
        } catch (error) {
            throw new AppError("Something went wrong try again", 500);
        }
    }

    /**
     * @param {string} id
     */
    async getUserById(id) {
        try {
            const user = await UserModel.findOne({
                attributes: { exclude: ['passwordHash', 'lastLoginAt'] },
                where: { id, isActive: true },
            });
            if (!user) {
                throw new AppError("User not found", 404);
            }
            return user.dataValues;
        } catch (error) {
            throw new AppError("Something went wrong try again", 500);
        }
    }

    /**
     * @param {UserModelData} userParams
     */
    async createUser(userParams) {
        try {
            const user = await UserModel.create(userParams);
            return user.dataValues;
        } catch (error) {
            throw new AppError("Internal server error", 500);
        }
    }

    /**
     * @param {string} id
     * @param {Partial<Pick<UserModelData, 'username'>>} userParam
     */
    async updateUser(id, userParam) {
        try {
            const user = await UserModel.findOne({ where: { id, isActive: true } });
            if (!user) throw new AppError("User not found", 404);

            const updatedUser = await user.update({...userParam});
            return updatedUser.dataValues;
        }
        catch (error) {
            throw new AppError("Internal server error", 500);
        }
    }

    /**
     * @param {string} id
     */
    async deleteUser(id) {
        try {
            const user = await UserModel.findOne({ where: { id } });
            if (!user) throw new AppError("User not found", 404);

            user.destroy();
            return { message: "User deleted successfully" };
        }
        catch (error) {
            throw new AppError("Internal server error", 500);
        }
    }
}