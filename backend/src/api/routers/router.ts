import express, { Express } from "express";
import cors from "cors";
import logger from "app/utils/logger";
import { AppServices } from "app/app-services";
import { wrap } from "app/utils/express";
import { healthCheck } from "app/api/controllers/check-health";
import { createSkill } from "../controllers/create-skill";
import { getSkills } from "../controllers/get-skills";

export async function buildRouter(services: AppServices): Promise<Express> {
  logger.debug("Building router");

  const app = express();
  app.use(cors({ origin: "*" }));
  app.use(express.json());

  app.get("/api/skills", wrap(getSkills(services)));
  app.post("/api/skills", wrap(createSkill(services)));

  app.get("/health", wrap(healthCheck(services)));

  return app;
}
