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
import { authMiddleware } from "../middleware/auth-middleware";
import cookieParser from "cookie-parser";
import { requestUploadUrl } from "../controllers/photos/request-upload-url";

export async function buildRouter(services: AppServices): Promise<Express> {
  logger.debug("Building router");

  const app = express();
  app.use(cors({ origin: "*" }));
  app.use(express.json());
  app.use(cookieParser());

  // Quick test route to check gRPC JWT generation
  app.post(
    "/api/test-token",
    wrap(async (req, res) => {
      const { userId = 123, tokenType = "auth" } = req.body || {};

      logger.info(`Testing JWT generation for userId: ${userId}`);

      const response = await services.mediaAuthClient.jwtGenerate({
        userId,
        tokenType,
      });

      res.status(200).json({
        success: true,
        data: response,
      });
    }),
  );
  // end of test

  // real test of the authMiddleware
  app.post(
    "/api/test-token-rly",
    authMiddleware(services), // <--- Blocks requests lacking a valid session/auth token
    wrap(async (req, res) => {
      // req.user is now guaranteed to exist from authMiddleware
      const userId = req.userId || 0;
      const tokenType = req.body?.tokenType || "auth";

      const response = await services.mediaAuthClient.jwtGenerate({
        userId,
        tokenType,
      });

      res.status(200).json({
        success: true,
        data: response,
      });
    }),
  );
  // end of test

  app.get("/api/skills", wrap(getSkills(services)));
  app.post("/api/skills", wrap(createSkill(services)));
  app.get("/api/activities", wrap(getActivities(services)));
  app.post(
    "/api/activities",
    validateCreateActivity(),
    wrap(createActivity(services)),
  );

  app.get("/api/photos/upload-url", wrap(requestUploadUrl(services)));

  app.get("/health", wrap(healthCheck(services)));

  app.use(errorsMiddleware());

  return app;
}
