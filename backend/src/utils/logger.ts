import { createLogger, transports, format, Logger } from "winston";
import { Format } from "logform";
import { createEnvReader } from "app/utils/env";

const { readRequiredString, readOptionalString } = createEnvReader(process.env);
const env = readRequiredString("ENVIRONMENT");
const appVersion = readOptionalString("APP_VERSION", "unknown");
const level = readRequiredString("LOG_LEVEL");

function createEnvFormat(): Format {
  return {
    transform: (logObj) => {
      logObj.environment = env;
      logObj.appVersion = appVersion;
      return logObj;
    },
  };
}

export function createDefaultLogger(): Logger {
  return createLogger({
    level,
    transports: [
      new transports.Console({
        format: format.combine(
          format.timestamp(),
          createEnvFormat(),
          ...(env === "local"
            ? [format.align(), format.colorize(), format.simple()]
            : [format.json()])
        ),
      }),
    ],
  });
}

const logger = createDefaultLogger();
export default logger;
