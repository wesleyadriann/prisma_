import { Router } from "express";
import { StatusCodes } from "http-status-codes";

import { accountService } from "../services/AccountService.js";

const router = Router();

router.get("/v1/account", async (_req, res) => {
  const response = await accountService.getAccounts();

  res.status(StatusCodes.OK).json(response);
});

router.post("/v1/account", async (req, res) => {
  const response = await accountService.createAccount(req.body);

  res.status(StatusCodes.OK).json(response);
});

router.get("/v1/account/:idOrEmail", async (req, res) => {
  const response = await accountService.getAccount(req.params.idOrEmail);

  res.status(StatusCodes.OK).json(response);
});

router.delete("/v1/account/:id", async (req, res) => {
  await accountService.deleteAccount(req.params.id);

  res.status(StatusCodes.NO_CONTENT).send();
});

router.patch("/v1/account/:id", async (req, res) => {
  const response = await accountService.updateAccount(req.params.id, req.body);

  res.status(StatusCodes.OK).json(response);
});

export const accountController = router;
