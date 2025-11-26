import express from "express";

import { AccountController } from "./controllers/AccountController.js";
import { AuthController } from "./controllers/AuthController.js";
import { HealthController } from "./controllers/HealthController.js";
import { EmailController } from "./controllers/EmailController.js";

import { DatabaseClient } from "./infrastructure/Database.js";
import { QueueClient } from "./infrastructure/Queue.js";

import { exceptionMiddleware } from "./middlewares/exceptionMiddleware.js";
import { notFoundMiddleware } from "./middlewares/notFoundMiddleware.js";
import { logger } from "./utils/logger.js";

export class App {
  public app: express.Application;
  public port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;

    this.startInfraConnection();

    this.registerMiddlewares();
    this.registerControllers();
    this.registerCustomMiddlewares();
  }

  registerControllers() {
    this.app.use(new AuthController().router);
    this.app.use(new AccountController().router);
    this.app.use(new HealthController().router);
    this.app.use(new EmailController().router);
  }

  registerMiddlewares() {
    this.app.use(express.json());
  }

  registerCustomMiddlewares() {
    this.app.use(notFoundMiddleware);
    this.app.use(exceptionMiddleware);
  }

  startInfraConnection() {
    new DatabaseClient().connect();
    new QueueClient().connect();
  }

  listen() {
    this.app.listen(this.port, () => {
      logger.info("Server is running on port: " + this.port);
    });
  }
}
