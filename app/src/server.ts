import express from "express";

import { accountController } from "./controllers/accountController.js";
import { healthController } from "./controllers/healthController.js";

import { exceptionMiddleware } from "./middlewares/exceptionMiddleware.js";

import { logger } from "./utils/logger.js";

(() => {
  const app = express();

  app.use(express.json());

  app.use(accountController);
  app.use(healthController);

  app.use(exceptionMiddleware);

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    logger.info("Server is running on port: " + port);
  });
})();
