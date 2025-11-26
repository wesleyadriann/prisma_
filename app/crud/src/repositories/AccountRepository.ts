import { DatabaseClient } from "../infrastructure/Database.js";

export type AccountRepository = typeof DatabaseClient.connection.account;
export const AccountRepository = () => DatabaseClient.connection.account;
