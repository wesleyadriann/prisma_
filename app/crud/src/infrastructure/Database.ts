import { PrismaClient } from "@prisma/client";

export class DatabaseClient {
  static connection: PrismaClient;

  public async connect() {
    if (DatabaseClient.connection) return;
    DatabaseClient.connection = new PrismaClient({ log: ["info"] });
    await DatabaseClient.connection.$connect();
  }
}
