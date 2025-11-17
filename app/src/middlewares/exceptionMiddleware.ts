import { NextFunction, Request, Response } from "express";

import { getReasonPhrase } from "http-status-codes";

import { Exception } from "../exceptions/exception.js";

export const exceptionMiddleware = (
  error: Exception,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const status = error.getStatus();

  res.status(status).json({
    code: status,
    message: getReasonPhrase(status),
    details: error.message,
  });
};
