import { createHash } from "node:crypto";
import JWT from "jsonwebtoken";

const { sign, verify } = JWT;

/**
 * @typedef {Object} JWTPayload
 * @property {string} email
 * @property {string} id
 * @property {string} role
 * @property {boolean} isActive
 */

/**
 * @param {string} password
 * @returns {string}
 */
export function hashPassword(password) {
  return createHash("sha256").update(password).digest("hex");
}

/**
 *
 * @param {JWTPayload} payload
 * @returns {string}
 */
export function signJWT(payload) {
  const secret = process.env.JWT_SECRET_KEY;
  return sign(payload, secret, { algorithm: "HS256", expiresIn: "5m" });
}

/**
 * @param {string} token
 * @returns {JWTPayload}
 */
export function verifyJWT(token) {
  const secret = process.env.JWT_SECRET_KEY;
  return verify(token, secret, { algorithm: "HS256" });
}