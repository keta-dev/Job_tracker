import { AppError } from "../helpers/errorHandlers.js";
import { successResponse } from "../helpers/response.js";
import { ApplicationService } from "../services/Book.service.js";

export class ApplicationController {
  /**
   * @type {ApplicationService}
   * @private
   */
  #applicationService;

  /**
   * @param {ApplicationService} applicationService
   * @constructor
   */
  constructor(applicationService) {
    this.#applicationService = applicationService;

    this.getAllApplications = this.getAllApplications.bind(this);
    this.getApplicationById = this.getApplicationById.bind(this);
    this.createApplication = this.createApplication.bind(this);
    this.updateApplication = this.updateApplication.bind(this);
    this.deleteApplication = this.deleteApplication.bind(this);
  }

  /**
   * @type {RequestHandler}
   */
  async getAllApplications(req, res) {
    const applications = await this.#applicationService.getApplications();
    successResponse(res, applications, "Applications retrieved successfully");
  }

  /**
   * @type {RequestHandler}
   */
  async getApplicationById(req, res) {
    const applicationId = req.params.id;
    if (applicationId && typeof applicationId === "string") {
      const application = await this.#applicationService.getApplication(applicationId);
      return successResponse(res, application, "Application retrieved successfully");
    }

    throw new AppError(400, "parameter `id` is missing");
  }

  /**
   * @type {RequestHandler}
   */
  async createApplication(req, res) {
    const {
      companyName,
      jobTitle,
      salaryRange,
      status,
      jobUrl,
    } = req.body;
    if (
      companyName &&
      jobTitle &&
      salaryRange &&
      status &&
      jobUrl
    ) {
      const application = await this.#applicationService.createApplication({
        companyName,
        jobTitle,
        salaryRange,
        status,
        jobUrl,
      });
      return successResponse(res, application, "Application created successfully", 201);
    }
    throw new AppError(400, "Incomplete Parameters");
  }

  /**
   * @type {RequestHandler}
   */
  async updateApplication(req, res) {
    const updateApplicationData = req.body;
    const applicationId = req.params.id;
    if (
      (updateApplicationData.companyName ||
        updateApplicationData.jobTitle ||
        updateApplicationData.salaryRange ||
        updateApplicationData.status ||
        updateApplicationData.jobUrl) &&
      applicationId &&
      typeof applicationId === "string"
    ) {
      const application = await this.#applicationService.updateApplication(applicationId, updateApplicationData);
      return successResponse(res, application, "Application updated successfully");
    }
    throw new AppError(400, "Incomplete Parameters");
  }

  /**
   * @type {RequestHandler}
   */
  async updateApplication(req, res) {
    const updateApplicationData = req.body;
    const applicationId = req.params.id;
    if (
      (updateApplicationData.companyName ||
        updateApplicationData.jobTitle ||
        updateApplicationData.salaryRange ||
        updateApplicationData.status ||
        updateApplicationData.jobUrl) &&
      applicationId &&
      typeof applicationId === "string"
    ) {
      const application = await this.#applicationService.updateApplication(applicationId, updateApplicationData);
      return successResponse(res, application, "Application updated successfully");
    }

    throw new AppError(400, "Request body cannot be empty");
  }

  /**
   * @type {RequestHandler}
   */
  async deleteApplication(req, res, next) {
    const applicationId = req.params.id;
    if (applicationId && typeof applicationId === "string") {
      const application = await this.#applicationService.deleteApplication(applicationId);
      return successResponse(res, application, "Application deleted successfully");
    }

    next(new AppError(400, "parameter `id` is missing"));
  }
}