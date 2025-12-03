import { Response, Request, NextFunction } from "express";
import { AppServices } from "app/app-services";
import { entityToDto, createActivitySchema } from "app/api/dtos/ActivityDto";
import { HttpErrorResponse } from "app/utils/errors";

export function createActivity({ storages }: AppServices) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newActivity = createActivitySchema.parse(req.body);
      const exists = await storages.activitiesStorage.getByTitle(
        newActivity.title
      );

      if (exists) {
        throw new HttpErrorResponse(409, {
          message: `Activity with title "${newActivity.title}" already exists.`,
          kind: "CONFLICT",
        });
      }

      const data = await storages.activitiesStorage.insert(newActivity);
      const activity = entityToDto(data);
      res.status(201).json({ activity });
    } catch (error) {
      next(error);
    }
  };
}
