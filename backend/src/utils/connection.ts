import { createEnvReader } from "./env";
import { Knex } from "knex";

export function dbConnectionBuilder(): Knex.ConnectionConfig {
  const { readRequiredString, readRequiredInt } = createEnvReader(process.env);
  let database: string = "PGDATABASE";
  if (readRequiredString("ENVIRONMENT") === "test") {
    database = "PGDATABASE_TEST";
  }
  const connection = {
    host: readRequiredString("PGHOST"),
    port: readRequiredInt("PGPORT"),
    database: readRequiredString(database),
    user: readRequiredString("PGUSER"),
    password: readRequiredString("PGPASSWORD"),
  };

  return connection;
}
