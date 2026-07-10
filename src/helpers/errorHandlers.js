import * as express from "express";

const { Request, Response, NextFunction } = express;

export class AppError extends Error {
  /**
   * @type {number}
   */
  statusCode;

  /**
   * @param {number} statusCode - HTTP Status Code
   * @param {string} message - Error message
   * @param {ErrorOptions} [options={}] - Error options
   * @constructor
   */
  constructor(statusCode, message, options = {}) {
    super(message, options);
    this.statusCode = statusCode;
  }
}

/**
 * @param {number} statusCode
 */
function getErrorMessage(statusCode = 500) {
  switch (statusCode) {
    case 400:
      return "Bad Request";
    case 401:
    case 403:
      return "Unauthorized";
    case 404:
      return "Not Found";
    case 500:
      return "Internal Server Error";
    default:
      return "Server Error";
  }
}

/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function notFoundErrorHandler(req, res, next) {
  next(new AppError(404, `${req.url} not found`));
}

/**
 * @param {AppError} error
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function appErrorHandler(error, req, res, next) {
  res.status(error.statusCode ?? 500).json({
    success: false,
    error: {
      message: error.message,
      statusCode: error.statusCode,
    },
    message: getErrorMessage(error.statusCode),
  });
}
