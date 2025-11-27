import chai, { expect } from "chai";
import { GetActivitiesResponse } from "app/api/controllers/activities/get-activities";
import { TestApp, getTestApp } from "app/setup-integration-tests.test";

describe("Activities get controller tests", () => {
  let testApp: TestApp;
  let agent: ChaiHttp.Agent;

  beforeEach(async () => {
    testApp = await getTestApp();
    agent = chai.request.agent(testApp.app);
  });

  it("should return an empty list", async () => {
    const response = await agent.get("/api/activities");
    const resBody = response.body as GetActivitiesResponse;

    expect(response.status).to.be.eq(200);
    expect(resBody.activities).to.be.an("array").that.is.empty;
  });

  it("should return a list of activities", async () => {
    await testApp.services.storages.activitiesStorage.insert({
      title: "Get a baby",
      summary:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita deserunt deleniti qui maxime quas laborum ipsum, vitae tempore delectus nihil et distinctio corporis iusto autem fugiat sequi labore modi ea quidem, cum porro. Excepturi error ipsum consectetur a odio doloribus, eius quas praesentium autem veritatis ipsam necessitatibus amet nobis? Velit!",
      image_path: "./minature/get_baby.jpg",
      first_skill: "coordination",
      age: 3,
      preparation: "Low",
    });

    await testApp.services.storages.activitiesStorage.insert({
      title: "Rise a baby",
      summary:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate odio est odit quidem harum veniam totam blanditiis excepturi nobis laboriosam sed minima, incidunt voluptatibus provident eaque atque nemo recusandae ullam vero reiciendis maxime unde eos quia. Quis ex ratione vero excepturi hic. Porro velit non soluta autem commodi suscipit. Molestiae nisi aliquid adipisci excepturi ex iure accusamus explicabo impedit vel voluptatem eius blanditiis, est iste porro, et ipsum hic. Quaerat aperiam modi placeat provident minus.",
      image_path: "./minature/happy_baby.jpg",
      first_skill: "Sensory",
      second_skill: "Gross motor",
      age: 2,
      preparation: "High",
    });

    const response = await agent.get("/api/activities");
    const resBody = response.body as GetActivitiesResponse;

    expect(response.status).to.be.eq(200);
    expect(resBody.activities.length).to.be.eq(2);
  });

  it("should return a list of activities with correct data", async () => {
    await testApp.services.storages.activitiesStorage.insert({
      title: "Get a baby",
      summary:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita deserunt deleniti qui maxime quas laborum ipsum, vitae tempore delectus nihil et distinctio corporis iusto autem fugiat sequi labore modi ea quidem, cum porro. Excepturi error ipsum consectetur a odio doloribus, eius quas praesentium autem veritatis ipsam necessitatibus amet nobis? Velit!",
      image_path: "./minature/get_baby.jpg",
      first_skill: "coordination",
      age: 3,
      preparation: "Low",
    });

    await testApp.services.storages.activitiesStorage.insert({
      title: "Rise a baby",
      summary:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate odio est odit quidem harum veniam totam blanditiis excepturi nobis laboriosam sed minima, incidunt voluptatibus provident eaque atque nemo recusandae ullam vero reiciendis maxime unde eos quia. Quis ex ratione vero excepturi hic. Porro velit non soluta autem commodi suscipit. Molestiae nisi aliquid adipisci excepturi ex iure accusamus explicabo impedit vel voluptatem eius blanditiis, est iste porro, et ipsum hic. Quaerat aperiam modi placeat provident minus.",
      image_path: "./minature/happy_baby.jpg",
      first_skill: "Sensory",
      second_skill: "Gross motor",
      age: 2,
      preparation: "High",
    });

    const response = await agent.get("/api/activities");
    const resBody = response.body as GetActivitiesResponse;
    expect(response.status).to.be.eq(200);
    expect(resBody.activities[0]).to.include({
      title: "Get a baby",
      summary:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita deserunt deleniti qui maxime quas laborum ipsum, vitae tempore delectus nihil et distinctio corporis iusto autem fugiat sequi labore modi ea quidem, cum porro. Excepturi error ipsum consectetur a odio doloribus, eius quas praesentium autem veritatis ipsam necessitatibus amet nobis? Velit!",
      image_path: "./minature/get_baby.jpg",
      first_skill: "coordination",
      age: 3,
      preparation: "Low",
    });
    expect(resBody.activities[1]).to.include({
      title: "Rise a baby",
      summary:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate odio est odit quidem harum veniam totam blanditiis excepturi nobis laboriosam sed minima, incidunt voluptatibus provident eaque atque nemo recusandae ullam vero reiciendis maxime unde eos quia. Quis ex ratione vero excepturi hic. Porro velit non soluta autem commodi suscipit. Molestiae nisi aliquid adipisci excepturi ex iure accusamus explicabo impedit vel voluptatem eius blanditiis, est iste porro, et ipsum hic. Quaerat aperiam modi placeat provident minus.",
      image_path: "./minature/happy_baby.jpg",
      first_skill: "Sensory",
      second_skill: "Gross motor",
      age: 2,
      preparation: "High",
    });
    expect(resBody.activities[0]?.id).to.be.a("number");
    expect(resBody.activities[1]?.id).to.be.a("number");
    expect(resBody.activities[0]?.updatedAt).to.be.a("string");
    expect(resBody.activities[1]?.updatedAt).to.be.a("string");
  });

  it("should return activities with unique IDs", async () => {
    await testApp.services.storages.activitiesStorage.insert({
      title: "Get a baby",
      summary:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita deserunt deleniti qui maxime quas laborum ipsum, vitae tempore delectus nihil et distinctio corporis iusto autem fugiat sequi labore modi ea quidem, cum porro. Excepturi error ipsum consectetur a odio doloribus, eius quas praesentium autem veritatis ipsam necessitatibus amet nobis? Velit!",
      image_path: "./minature/get_baby.jpg",
      first_skill: "coordination",
      age: 3,
      preparation: "Low",
    });

    await testApp.services.storages.activitiesStorage.insert({
      title: "Rise a baby",
      summary:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate odio est odit quidem harum veniam totam blanditiis excepturi nobis laboriosam sed minima, incidunt voluptatibus provident eaque atque nemo recusandae ullam vero reiciendis maxime unde eos quia. Quis ex ratione vero excepturi hic. Porro velit non soluta autem commodi suscipit. Molestiae nisi aliquid adipisci excepturi ex iure accusamus explicabo impedit vel voluptatem eius blanditiis, est iste porro, et ipsum hic. Quaerat aperiam modi placeat provident minus.",
      image_path: "./minature/happy_baby.jpg",
      first_skill: "Sensory",
      second_skill: "Gross motor",
      age: 2,
      preparation: "High",
    });

    const response = await agent.get("/api/activities");
    const resBody = response.body as GetActivitiesResponse;

    expect(response.status).to.be.eq(200);
    expect(resBody.activities[0]?.id).to.exist;
    expect(resBody.activities[1]?.id).to.exist;
    expect(resBody.activities[0]?.id).to.be.a("number");
    expect(resBody.activities[1]?.id).to.be.a("number");
    expect(resBody.activities[0]?.id).to.not.equal(resBody.activities[1]?.id);
  });
});
