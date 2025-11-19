import { Router, Request, Response } from "express";

import { StatusCodes } from "http-status-codes";

export class HealthController {
  public router = Router();

  private path = "/health";

  constructor() {
    this.createRoutes();
  }

  createRoutes() {
    this.router.get(this.path, this.healthCheck);
  }

  healthCheck(_request: Request, response: Response) {
    response.status(StatusCodes.OK).json({});
  }
}
