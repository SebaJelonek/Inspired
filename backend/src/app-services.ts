import { Knex, knex as buildKnex } from "knex";
import { AppConfig, appConfig as getAppConfig } from "app/config";
import { SkillsMockStorage } from "app/storages/skills/SkillsMockStorage";
import { SkillsStorage } from "app/storages/skills/SkillsStorage";
import { SkillsDbStorage } from "app/storages/skills/SkillsDbStorage";
import logger from "app/utils/logger";
import { ActivitiesDbStorage } from "./storages/activities/ActivitiesDbStorage";
import { ActivitiesMockStorage } from "./storages/activities/ActivitiesMockStorage";
import { ActivitiesStorage } from "./storages/activities/ActivitiesStorage";

export type AppServices = {
  appConfig: AppConfig;
  storages: Storages;
};

export const appServiceBuilder = async (): Promise<AppServices> => {
  logger.info("Building app services");
  const appConfig = await getAppConfig();
  const { useDbMock } = appConfig;
  let storages: Storages;

  if (useDbMock) {
    storages = createMockStorages();
  } else {
    storages = createStorages(appConfig);
    await startStorages(storages);
  }

  return {
    appConfig,
    storages,
  };
};

const startStorages = async (storages: Storages) => {
  await storages.knex?.raw("CREATE SCHEMA IF NOT EXISTS app");
  await storages.knex?.migrate.latest();
};

const createStorages = (getAppConfig: AppConfig) => {
  const knex = buildKnex(getAppConfig.DbConfig);
  const skillsStorage = new SkillsDbStorage(knex);
  const activitiesStorage = new ActivitiesDbStorage(knex);

  return {
    knex,
    skillsStorage,
    activitiesStorage,
  };
};

const createMockStorages = (): Storages => {
  return {
    knex: null,
    skillsStorage: new SkillsMockStorage(),
    activitiesStorage: new ActivitiesMockStorage(),
  };
};

export type Storages = {
  knex: Knex | null;
  skillsStorage: SkillsStorage;
  activitiesStorage: ActivitiesStorage;
};
