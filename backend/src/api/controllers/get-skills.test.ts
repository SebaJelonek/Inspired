import chai, { expect } from "chai";
import { GetSkillsResponse } from "app/api/controllers/get-skills";
import { TestApp, getTestApp } from "app/setup-integration-tests.test";

describe("getSkillsControler", () => {
  let testApp: TestApp;
  let agent: ChaiHttp.Agent;

  beforeEach(async () => {
    testApp = await getTestApp();
    agent = chai.request.agent(testApp.app);
  });
  it("should return a list of skills", async () => {
    await testApp.services.storages.skillsStorage.insert({
      name: "juggle",
      level: 3,
    });

    await testApp.services.storages.skillsStorage.insert({
      name: "Baking",
      level: 4,
    });

    const response = await agent.get("/skills");
    const resBody = response.body as GetSkillsResponse;

    expect(resBody.skills.length).to.be.eq(2);
  });
});
