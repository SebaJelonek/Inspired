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
  Port: number;
};

export async function appConfig() {
  const { readRequiredString, readOptionalBool, readRequiredInt } =
    createEnvReader(process.env);

  const enviroment = readRequiredString("ENVIRONMENT") as Enviroment;
  const port = readRequiredInt("PORT");
  const useDbMock = readOptionalBool("USE_DB_MOCK", false);

  return {
    enviroment,
    useDbMock,
    DbConfig: await getDbConfig(useDbMock),
    Port: port,
  };
}

function getDbConfig(useMock: boolean): Knex.Config {
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
      loadExtensions: [".ts"],
      schemaName: "app",
    },
  };
}
