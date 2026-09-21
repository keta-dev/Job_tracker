import { AuthService } from "./Auth.service.js";
import { ApplicationService } from "./Application.service.js";
import { UserService } from "./User.service.js";

export const userService = new UserService();
export const applicationService = new ApplicationService();
export const authService = new AuthService(userService);