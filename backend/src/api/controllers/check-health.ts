import { Request, Response } from "express";
import { AppServices } from "app/app-services";
import logger from "app/utils/logger";

export function healthCheck({ appConfig, storages }: AppServices) {
  return async (req: Request, res: Response) => {
    let dbError;
    try {
      await storages.knex?.raw("SELECT 1");
    } catch (error) {
      dbError = error;
      logger.error(`Health check database error: ${error}`);
    }
    let data = {
      env: appConfig.enviroment,
      db: { mock: appConfig.useDbMock, error: dbError, isOk: !dbError },
    };
    res.status(200).send(data);
  };
}
