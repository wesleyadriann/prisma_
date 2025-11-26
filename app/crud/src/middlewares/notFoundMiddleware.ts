import { Request } from "express";
import { StatusCodes } from "http-status-codes";
import { Exception } from "../exceptions/Exception.js";

export const notFoundMiddleware = (request: Request) => {
  throw new Exception(
    `Cannot ${request.method} ${request.path}`,
    StatusCodes.NOT_FOUND,
  );
};
