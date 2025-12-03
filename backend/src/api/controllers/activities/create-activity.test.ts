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

  it("should return a 400 error", async () => {
    const newActivity = {
      title: true,
      summary: 6.24,
      age: "false",
      preparation: "super High",
    };

    const response = await agent.post("/api/activities").send(newActivity);
    const message = response.body.message;
    expect(response.status).to.be.eq(400);
    expect(message).to.include(
      "Field 'title' must be a string, but received a boolean.\n"
    );
    expect(message).to.include(
      "Field 'summary' must be a string, but received a number.\n"
    );
    expect(message).to.include(
      "Field 'image_path' is empty, please fill in the 'image_path' field.\n"
    );
    expect(message).to.include(
      "Field 'first_skill' is empty, please fill in the 'first_skill' field.\n"
    );
    expect(message).to.include(
      "Field 'age' must be a number, but received a string.\n"
    );
    expect(message).to.include(
      `Field 'preparation' has a wrong input, expected to be "Low", "Medium" or "High".`
    );

    const activities =
      await testApp.services.storages.activitiesStorage.getAll();
    expect(activities).to.have.length(0);
  });

  it("should return 409 error", async () => {
    const newActivity = {
      title: "Rise a baby",
      summary: "Short summary text",
      image_path: "./minature/happy_baby.jpg",
      first_skill: "Sensory",
      age: 2,
      preparation: "High",
    };

    let response = await agent.post("/api/activities").send(newActivity);
    const activities =
      await testApp.services.storages.activitiesStorage.getAll();
    const savedActivity = activities[0];
    expect(response.status).to.be.eq(201);
    expect(activities).to.have.length(1);
    expect(savedActivity).to.exist;

    response = await agent.post("/api/activities").send(newActivity);

    expect(response.status).to.be.eq(409);
    expect(response.body.message).to.include(
      `Activity with title "${newActivity.title}" already exists.`
    );
    expect(response.body.kind).to.include("CONFLICT"),
      expect(activities).to.have.length(1);
  });

  it("should return 201 success for second_skill null", async () => {
    const newActivity = {
      title: "Rise a baby",
      summary: "Short summary text",
      image_path: "./minature/happy_baby.jpg",
      first_skill: "Sensory",
      second_skill: null,
      age: 2.5,
      preparation: "High",
    };

    let response = await agent.post("/api/activities").send(newActivity);
    const activities =
      await testApp.services.storages.activitiesStorage.getAll();
    const savedActivity = activities[0];
    expect(response.status).to.be.eq(201);
    expect(activities).to.have.length(1);
    expect(savedActivity).to.exist;
    expect(savedActivity?.second_skill).to.be.eq(null);
  });
});
