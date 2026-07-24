import { Response, Request, NextFunction } from "express";
import { AppServices } from "app/app-services";
import { HttpErrorResponse } from "app/utils/errors";
import { authMiddleware } from "app/api/middleware/auth-middleware";
import { wrap } from "app/utils/express";
import { randomUUID } from "node:crypto";

export function requestUploadUrl(services: AppServices) {
  const auth = authMiddleware(services);

  return wrap(async (req: Request, res: Response, next: NextFunction) => {
    auth(req, res, async (err) => {
      if (err) return next(err);

      const userId = req.userId;
      const eventId = req.query.eventId;

      const photoId = randomUUID();
      const containerName = "photos";
      const blobName = `raw/${eventId}/${photoId}.jpg`;

      const uploadUrl = await services.storages.blobStorage.generateSasUrl(
        containerName,
        blobName,
        "w",
        15,
      );

      res
        .status(200)
        .json({ success: true, data: { photoId, blobName, uploadUrl } });
    });
  });
}
