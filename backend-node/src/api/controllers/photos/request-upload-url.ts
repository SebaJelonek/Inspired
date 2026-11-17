import { Response, Request, NextFunction } from "express";
import { AppServices } from "app/app-services";
import { HttpErrorResponse } from "app/utils/errors";
import { authMiddleware } from "app/api/middleware/auth-middleware";
import { wrap } from "app/utils/express";
import { randomUUID } from "node:crypto";
import logger from "app/utils/logger";

export function requestUploadUrl(services: AppServices) {
  // const auth = authMiddleware(services);

  return wrap(async (req: Request, res: Response, next: NextFunction) => {
    // auth(req, res, async (err) => {
    // if (err) return next(err);

    const userId = req.userId;
    const eventId = req.query.eventId as string;

    const photoId = randomUUID();
    const containerName = "photos";
    const blobName = `raw/${eventId}/${photoId}.jpg`;

    const rawUploadUrl = await services.storages.blobStorage.generateSasUrl(
      containerName,
      blobName,
      "w",
      15,
    );

    const publicHost = services.appConfig.storageHost || "192.168.1.238:10000";
    const uploadUrl = rawUploadUrl.replace("http://azurite:10000", publicHost);
    // **
    // is this going to be necessary on production?
    // idk yet, i believe i will have a possibility to check
    // atm due to the fact that i am debuging it via adb azurite is not recognized
    // i would assume that it will be once i go production but we will see
    //
    //
    // **

    const data = { photoId, blobName, uploadUrl };
    res.status(200).json({ success: true, data });
  });
}
// );
// }
