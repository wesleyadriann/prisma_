import { StatusCodes } from "http-status-codes";

import { AccountDTO } from "../dto/accountDTO.js";
import { Exception } from "../exceptions/Exception.js";
import { prismaClient } from "../infrastructure/database.js";
import { isEmail } from "../utils/email.js";
import { logger } from "../utils/logger.js";

export class AccountService {
  public async getAccounts() {
    logger.info("AccountService.getAccount - start");

    const result = await prismaClient.account.findMany();

    logger.info(
      "AccountService.getAccount - retrieved " + result.length + " accounts",
    );
    logger.info("AccountService.getAccount - end");

    return { data: result };
  }

  async getAccount(idOrEmail: string) {
    logger.info("AccountService.getAccount - start");

    const [field, value] = isEmail(idOrEmail)
      ? ["email", idOrEmail]
      : ["id", parseInt(idOrEmail, 10)];

    try {
      const result = await prismaClient.account.findFirstOrThrow({
        where: { [field]: value },
      });

      return { data: result };
    } catch (error) {
      throw new Exception(
        `Account not found for ${field}: ${value}`,
        StatusCodes.NOT_FOUND,
      );
    }
  }

  async deleteAccount(id: string) {
    logger.info("AccountService.deleteAccount - start");

    try {
      const idAsNumber = parseInt(id, 10);
      const result = await prismaClient.account.delete({
        where: {
          id: idAsNumber,
        },
      });

      logger.info(
        "AccountService.deleteAccount - deleted account with id: " + result.id,
      );
      logger.info("AccountService.deleteAccount - end");
    } catch (error) {
      throw new Exception(
        `Account not found for id: ${id}`,
        StatusCodes.NOT_FOUND,
      );
    }
  }

  async updateAccount(id: string, account: AccountDTO) {
    logger.info("AccountService.updateAccount - start");

    const idAsNumber = parseInt(id, 10);
    const result = await prismaClient.account.update({
      where: {
        id: idAsNumber,
      },
      data: account,
    });

    return { data: result };
  }
}
