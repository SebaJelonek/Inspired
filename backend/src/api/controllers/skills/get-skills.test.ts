import chai, { expect } from "chai";
import { GetSkillsResponse } from "app/api/controllers/skills/get-skills";
import { TestApp, getTestApp } from "app/setup-integration-tests.test";

describe("getSkillsControler", () => {
  let testApp: TestApp;
  let agent: ChaiHttp.Agent;

  beforeEach(async () => {
    testApp = await getTestApp();
    agent = chai.request.agent(testApp.app);
  });

  it("should return an empty list", async () => {
    const response = await agent.get("/api/skills");
    const resBody = response.body as GetSkillsResponse;
    expect(response.status).to.be.eq(200);
    expect(resBody.skills).to.be.an("array").that.is.empty;
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

    const response = await agent.get("/api/skills");
    const resBody = response.body as GetSkillsResponse;
    expect(response.status).to.be.eq(200);
    expect(resBody.skills.length).to.be.eq(2);
  });

  it("should return a list of skills with correct data", async () => {
    await testApp.services.storages.skillsStorage.insert({
      name: "juggle",
      level: 3,
    });

    await testApp.services.storages.skillsStorage.insert({
      name: "Baking",
      level: 4,
    });

    const response = await agent.get("/api/skills");
    const resBody = response.body as GetSkillsResponse;

    expect(response.status).to.be.eq(200);
    expect(resBody.skills[0]).to.include({ name: "juggle", level: 3 });
    expect(resBody.skills[1]).to.include({ name: "Baking", level: 4 });
    expect(resBody.skills[0]?.skillId).to.be.a("number");
    expect(resBody.skills[1]?.skillId).to.be.a("number");
    expect(resBody.skills[0]?.updatedAt).to.be.a("string");
    expect(resBody.skills[1]?.updatedAt).to.be.a("string");
  });

  it("should return skills with unique IDs", async () => {
    await testApp.services.storages.skillsStorage.insert({
      name: "juggle",
      level: 3,
    });

    await testApp.services.storages.skillsStorage.insert({
      name: "Baking",
      level: 4,
    });

    const response = await agent.get("/api/skills");
    const resBody = response.body as GetSkillsResponse;

    expect(response.status).to.be.eq(200);
    expect(resBody.skills[0]?.skillId).to.exist;
    expect(resBody.skills[1]?.skillId).to.exist;
    expect(resBody.skills[0]?.skillId).to.be.a("number");
    expect(resBody.skills[1]?.skillId).to.be.a("number");
    expect(resBody.skills[1]?.skillId).to.not.equal(resBody.skills[0]?.skillId);
  });
});
