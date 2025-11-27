import chai, { expect } from "chai";
import { TestApp, getTestApp } from "app/setup-integration-tests.test";
import { entityToDto } from "app/api/dtos/ActivityDto";

describe("Activities create controller tests", () => {
  let testApp: TestApp;
  let agent: ChaiHttp.Agent;

  beforeEach(async () => {
    testApp = await getTestApp();
    agent = chai.request.agent(testApp.app);
  });

  it("should save a requested activity in database", async () => {
    const newActivity = {
      title: "Rise a baby",
      summary: "Short summary text",
      image_path: "./minature/happy_baby.jpg",
      first_skill: "Sensory",
      age: 2,
      preparation: "High",
    };

    const response = await agent.post("/api/activities").send(newActivity);
    const activities =
      await testApp.services.storages.activitiesStorage.getAll();
    const savedActivity = activities[0];

    expect(response.status).to.be.eq(201);
    expect(activities).to.have.length(1);
    expect(savedActivity).to.exist;
    expect(response.body.activity).to.include(entityToDto(savedActivity!));
  });
});
