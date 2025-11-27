import chai from "chai";
import { AppServices, appServiceBuilder } from "app/app-services";
import { Knex } from "knex";
import { Table } from "app/storages/DbSchema";
import { buildRouter } from "app/api/routers/router";
import { Express } from "express";
import chaiAsPromised from "chai-as-promised";
import chaiHttp from "chai-http";
import chaiSubset from "chai-subset";
import sinonChai from "sinon-chai";

chai.use(chaiAsPromised);
chai.use(chaiHttp);
chai.use(chaiSubset);
chai.use(sinonChai);

export type TestApp = { services: AppServices; app: Express };
let testApp: TestApp;

afterEach("Clean up after test", async () => {
  if (testApp && testApp.services.storages.knex) {
    await clearDb(testApp.services.storages.knex);
  }
});

export async function getTestApp() {
  if (!testApp) {
    const testAppService = await appServiceBuilder();
    testApp = {
      services: testAppService,
      app: await buildRouter(testAppService),
    };
  }
  return testApp;
}

async function clearDb(knex: Knex) {
  await knex(Table.Skills).delete();
  await knex(Table.Activities).delete();
}
