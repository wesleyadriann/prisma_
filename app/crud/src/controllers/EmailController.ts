import { Router, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { EmailService } from "../services/EmailService.js";

export class EmailController {
  router = Router();

  private readonly path = "/v1/email";
  private readonly emailService: EmailService;

  constructor() {
    this.emailService = new EmailService();
    this.createRoutes();
  }

  private createRoutes() {
    this.router.post(this.path, this.sendEmail.bind(this));
  }

  private async sendEmail(_request: Request, response: Response) {
    await this.emailService.sendEmail();

    response
      .status(StatusCodes.OK)
      .send({ message: "Email sent successfully" });
  }
}
