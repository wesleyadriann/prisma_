import bcrypt from "bcrypt";

import { AccountDTO } from "../dto/accountDTO.js";
import { AccountRepository } from "../repositories/AccountRepository.js";
import { logger } from "../utils/logger.js";

export class AuthService {
  private readonly SALT_ROUNDS = 10;
  private readonly accountRepository: AccountRepository;

  constructor() {
    this.accountRepository = AccountRepository();
  }

  async createAccount(account: AccountDTO) {
    logger.info("AuthService.createAccount - start");

    const passwordHash = await this.encodePassword(account.password);

    const { password: _password, ...result } =
      await this.accountRepository.create({
        data: { ...account, password: passwordHash },
      });

    logger.info(
      "AuthService.createAccount - created account with id: " + result.id,
    );
    logger.info("AuthService.createAccount - end");

    return { data: result };
  }

  private async encodePassword(password: string) {
    const salt = await bcrypt.genSalt(this.SALT_ROUNDS);

    const passwordHash = await bcrypt.hash(password, salt);

    return passwordHash;
  }
}
