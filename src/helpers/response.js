import express from "express";

const { Response } = express;

/**
 * Send a standard JSON success response.
 *
 * @template D
 * @param {Response} res
 * @param {D} data
 * @param {string} [message="Success"]
 * @param {number} [statusCode=200]
 * @returns {void}
 */
export function successResponse(
  res,
  data,
  message = "Success",
  statusCode = 200,
) {
  res.status(statusCode).json({ success: true, message, data });
}
