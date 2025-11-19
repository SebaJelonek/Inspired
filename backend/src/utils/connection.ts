import { createEnvReader } from "./env";
import { Knex } from "knex";

export function dbConnectionBuilder(): Knex.ConnectionConfig {
  const { readRequiredString, readRequiredInt } = createEnvReader(process.env);
  const connection = {
    host: readRequiredString("PGHOST"),
    port: readRequiredInt("PGPORT"),
    database: readRequiredString("PGDATABASE"),
    user: readRequiredString("PGUSER"),
    password: readRequiredString("PGPASSWORD"),
  };
  return connection;
}
