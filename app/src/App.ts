import express from "express";

import { AccountController } from "./controllers/AccountController.js";
import { AuthController } from "./controllers/AuthController.js";
import { HealthController } from "./controllers/HealthController.js";
import { prismaClient } from "./infrastructure/database.js";
import { exceptionMiddleware } from "./middlewares/exceptionMiddleware.js";
import { logger } from "./utils/logger.js";

export class App {
  public app: express.Application;
  public port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;

    this.registerMiddlewares();
    this.registerControllers();
    this.registerExepcetionMiddlewares();
    this.startDatabaseConnection();
  }

  registerControllers() {
    this.app.use(new AuthController().router);
    this.app.use(new AccountController().router);
    this.app.use(new HealthController().router);
  }

  registerMiddlewares() {
    this.app.use(express.json());
  }

  registerExepcetionMiddlewares() {
    this.app.use(exceptionMiddleware);
  }

  startDatabaseConnection() {
    prismaClient.$connect();
  }

  listen() {
    this.app.listen(this.port, () => {
      logger.info("Server is running on port: " + this.port);
    });
  }
}
