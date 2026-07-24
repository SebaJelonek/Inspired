import { join } from "path";
import { createEnvReader } from "app/utils/env";
import { Knex } from "knex";
import { dbConnectionBuilder } from "./utils/connection";

export enum Enviroment {
  local = "local",
  dev = "dev",
  prod = "prod",
  test = "test",
}

export type AppConfig = {
  enviroment: Enviroment;
  useDbMock: boolean;
  DbConfig: Knex.Config;
  BlobConnection: string;
  AccountKey: string;
  Port: number;
  goGrpc: string;
};

export async function appConfig() {
  const {
    readRequiredString,
    readOptionalBool,
    readRequiredInt,
    parseConnectionString,
  } = createEnvReader(process.env);

  const enviroment = readRequiredString("ENVIRONMENT") as Enviroment;
  const port = readRequiredInt("PORT");
  const useDbMock = readOptionalBool("USE_DB_MOCK", false);
  const azureStorage = readRequiredString("AZURE_STORAGE_CONNECTION_STRING");
  const goGrpc = readRequiredString("GO_BACKEND_HOST");
  const azureAccountKey = parseConnectionString(azureStorage, "AccountKey");

  return {
    enviroment,
    useDbMock,
    DbConfig: await getDbConfig(useDbMock),
    BlobConnection: azureStorage,
    AccountKey: azureAccountKey,
    Port: port,
    goGrpc: goGrpc,
  };
}

function extenstion() {
  const isProd = __filename.endsWith(".js");
  return isProd ? [".js"] : [".ts"];
}

function getDbConfig(useMock: boolean): Knex.Config {
  const extension = extenstion();
  if (useMock) {
    return {
      client: "mock",
    };
  }
  return {
    client: "pg",
    connection: dbConnectionBuilder(),
    migrations: {
      directory: join(__dirname, "./migrations"),
      loadExtensions: extension,
      schemaName: "app",
    },
  };
}
