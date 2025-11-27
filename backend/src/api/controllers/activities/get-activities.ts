import { Response, Request, NextFunction } from "express";
import { AppServices } from "app/app-services";
import { ActivityDto, entityToDto } from "app/api/dtos/ActivityDto";
import { ActivitiesEntity } from "app/entities/ActivitiesEntity";

export function getActivities({ storages }: AppServices) {
  return async (
    req: Request,
    res: Response<GetActivitiesResponse>,
    next: NextFunction
  ) => {
    try {
      const data: ActivitiesEntity[] =
        await storages.activitiesStorage.getAll();

      const activities: ActivityDto[] = data.map((entity) =>
        entityToDto(entity)
      );

      res.status(200).json({ activities });
    } catch (error) {
      next(error);
    }
  };
}

export type GetActivitiesResponse = {
  activities: ActivityDto[];
};
