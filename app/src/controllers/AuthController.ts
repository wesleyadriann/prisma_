import { Request, Router, Response } from "express";
import { AuthService } from "../services/AuthService.js";
import { StatusCodes } from "http-status-codes";

export class AuthController {
  router = Router();

  private path = "/v1/auth";
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
    this.createRoutes();
  }

  createRoutes() {
    this.router.post(this.path + "/new-account", this.createAccount.bind(this));
  }

  private createAccount(request: Request, response: Response) {
    const body = this.authService.createAccount(request.body);

    response.status(StatusCodes.CREATED).json(body);
  }
}
