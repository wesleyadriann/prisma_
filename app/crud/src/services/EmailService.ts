import { QueueClient } from "../infrastructure/Queue.js";
import { logger } from "../utils/logger.js";

export class EmailService {
  queueService: QueueClient;

  constructor() {
    this.queueService = new QueueClient();
  }
  async sendEmail() {
    logger.info("EmailService.sendEmail - start");
    const status = this.queueService.sendToQueue("hello world");

    logger.info("EmailService.sendEmail - end - sucess:", status);
  }
}
