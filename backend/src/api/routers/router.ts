import express, { Express } from "express";
import cors from "cors";
import logger from "app/utils/logger";
import { AppServices } from "app/app-services";
import { wrap } from "app/utils/express";
import { healthCheck } from "app/api/controllers/check-health";
import { createSkill } from "app/api/controllers/skills/create-skill";
import { getSkills } from "app/api/controllers/skills/get-skills";
import { getActivities } from "app/api/controllers/activities/get-activities";
import { createActivity } from "../controllers/activities/create-activity";
import { errorsMiddleware } from "../middleware/errors-middleware";
import { validateCreateActivity } from "../middleware/create-activity-validation";

export async function buildRouter(services: AppServices): Promise<Express> {
  logger.debug("Building router");

  const app = express();
  app.use(cors({ origin: "*" }));
  app.use(express.json());

  app.get("/api/skills", wrap(getSkills(services)));
  app.post("/api/skills", wrap(createSkill(services)));
  app.get("/api/activities", wrap(getActivities(services)));
  app.post(
    "/api/activities",
    validateCreateActivity(),
    wrap(createActivity(services))
  );

  app.get("/health", wrap(healthCheck(services)));

  app.use(errorsMiddleware());

  return app;
}
