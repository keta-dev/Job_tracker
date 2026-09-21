"use strict";

import { Application } from "../models/Application.model.js";
import { AppError } from "../helpers/errorHandlers.js";

/**
 * @typedef {Object} ApplicationData
 * @property {string} companyName
 * @property {string} jobTitle
 * @property {string} salaryRange
 * @property {string} status
 * @property {string} jobUrl
 */

export class ApplicationService {
  async getApplications() {
    try {
      const applications = await Application.findAll({
        attributes: { exclude: "quantity" },
      });
      return applications.map((app) => app.dataValues);
    } catch (err) {
      throw new AppError(500, "Something went wrong, try again.");
    }
  }

  /**
   * @param {string} id
   */
  async getApplication(id) {
    try {
      const application = await Application.findOne({
        attributes: { exclude: "quantity" },
        where: { id },
      });
      if (!application) throw new AppError(404, "Application not found");

      return application.dataValues;
    } catch (err) {
      throw new AppError(500, "Something went wrong, try again.");
    }
  }

  /**
   * @param {ApplicationData} applicationParam
   */
  async createApplication(applicationParam) {
    try {
      const application = await Application.create({ ...applicationParam });
      return application.dataValues;
    } catch (err) {
      throw new AppError(400, "Invalid application parameters");
    }
  }

  /**
   * @param {string} id
   * @param {Partial<ApplicationData>} applicationParam
   */
  async updateApplication(id, applicationParam) {
    try {
      const application = await Application.findOne({ where: { id } });
      if (!application) throw new AppError(404, "Application not found");

      const updatedApplication = await application.update({ ...applicationParam });
      return updatedApplication;
    } catch (err) {
      if (err instanceof AppError) throw err;
      throw new AppError(400, "Invalid application parameters");
    }
  }

  /**
   * @param {string} id
   */
  async deleteApplication(id) {
    try {
      const application = await Application.findOne({ where: { id } });
      if (!application) throw new AppError(404, "Application not found");

      application.destroy();
      return "Application deleted successfully";
    } catch (err) {
      if (err instanceof AppError) throw err;
      throw new AppError(500, "Something went wrong, try again.");
    }
  }
}