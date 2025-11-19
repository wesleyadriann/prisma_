import { Router, Response, Request } from "express";
import { StatusCodes } from "http-status-codes";

import { AccountService } from "../services/AccountService.js";

export class AccountController {
  router = Router();

  private path = "/v1/account";
  private accountService: AccountService;

  constructor() {
    this.accountService = new AccountService();
    this.createRoutes();
  }

  createRoutes() {
    this.router.get(this.path, this.getAccounts.bind(this));
    this.router.get(this.path + "/:idOrEmail", this.getAccount.bind(this));
    this.router.delete(this.path + "/:id", this.deleteAccount.bind(this));
    this.router.patch(this.path + "/:id", this.updateAccount.bind(this));
  }

  async getAccounts(_req: Request, response: Response) {
    const body = await this.accountService.getAccounts();

    response.status(StatusCodes.OK).json(body);
  }

  async getAccount(
    request: Request<{ idOrEmail: string }>,
    response: Response,
  ) {
    const body = await this.accountService.getAccount(request.params.idOrEmail);

    response.status(StatusCodes.OK).json(body);
  }

  async deleteAccount(request: Request<{ id: string }>, response: Response) {
    await this.accountService.deleteAccount(request.params.id);

    response.status(StatusCodes.NO_CONTENT).send();
  }

  async updateAccount(request: Request<{ id: string }>, response: Response) {
    const body = await this.accountService.updateAccount(
      request.params.id,
      request.body,
    );

    response.status(StatusCodes.OK).json(body);
  }
}
