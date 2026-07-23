import { Knex, knex as buildKnex } from "knex";
import { BlobServiceClient } from "@azure/storage-blob"; // Install via: npm i @azure/storage-blob
import { AppConfig, appConfig as getAppConfig } from "app/config";
import { SkillsMockStorage } from "app/storages/skills/SkillsMockStorage";
import { SkillsStorage } from "app/storages/skills/SkillsStorage";
import { SkillsDbStorage } from "app/storages/skills/SkillsDbStorage";
import { ActivitiesDbStorage } from "./storages/activities/ActivitiesDbStorage";
import { ActivitiesMockStorage } from "./storages/activities/ActivitiesMockStorage";
import { ActivitiesStorage } from "./storages/activities/ActivitiesStorage";
import logger from "app/utils/logger";

// Import your new blob variants
import { BlobStorage } from "./storages/blob/BlobStorage";
import { AzureBlobStorage } from "./storages/blob/AzureBlobStorage";
import { MockBlobStorage } from "./storages/blob/MockBlobStorage";
import { createAuthMediaClient, MediaAuthClient } from "./utils/auth-media-client";

export type AppServices = {
  appConfig: AppConfig;
  storages: Storages;
  mediaAuthClient: MediaAuthClient
};

export type Storages = {
  knex: Knex | null;
  skillsStorage: SkillsStorage;
  activitiesStorage: ActivitiesStorage;
  blobStorage: BlobStorage; // Added to structural engine types
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
  BlobServiceClient.fromConnectionString(appConfig.BlobConnection);
  const mediaAuthClient = createAuthMediaClient(appConfig.goGrpc)
  return {
    appConfig,
    storages,
    mediaAuthClient,
  };
};

const startStorages = async (storages: Storages) => {
  await storages.knex?.raw("CREATE SCHEMA IF NOT EXISTS app");
  await storages.knex?.migrate.latest();

  // Note: If you need to guarantee container creation on system start,
  // you could invoke a initialization method on storages.blobStorage here.
};

const createStorages = (config: AppConfig): Storages => {
  const knex = buildKnex(config.DbConfig);

  // Instantiate SDK client using connection string configuration passed down
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    config.BlobConnection,
  );
  const blobStorage = new AzureBlobStorage(blobServiceClient);

  // Pass blobStorage down into DbStorage drivers if they require relational linking
  const skillsStorage = new SkillsDbStorage(knex);
  const activitiesStorage = new ActivitiesDbStorage(knex);

  return {
    knex,
    skillsStorage,
    activitiesStorage,
    blobStorage,
  };
};

const createMockStorages = (): Storages => {
  return {
    knex: null,
    skillsStorage: new SkillsMockStorage(),
    activitiesStorage: new ActivitiesMockStorage(),
    blobStorage: new MockBlobStorage(), // Isolation layer for your tests
  };
};
