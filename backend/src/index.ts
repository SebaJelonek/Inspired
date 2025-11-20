import { createServer } from "http";
import { appServiceBuilder } from "app/app-services";
import { buildRouter } from "app/api/routers/router";
import logger from "app/utils/logger";

async function main() {
  const { appConfig, storages } = await appServiceBuilder();
  const router = await buildRouter({ appConfig, storages });
  let server = createServer(router);

  server.listen(appConfig.Port, () => {
    logger.info(
      `Server is running at http://localhost:${appConfig.Port} in ${appConfig.enviroment} mode`
    );
  });
  return Promise.resolve();
}

main()
  .then(() => logger.info("Server is running"))
  .catch((err) => {
    logger.error(`Server has field with error: ${err}`);
    process.exit(1);
  });
