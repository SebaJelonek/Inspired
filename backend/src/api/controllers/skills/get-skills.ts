import { Response, Request, NextFunction } from "express";
import { AppServices } from "app/app-services";
import { entityToDto, SkillDto } from "app/api/dtos/SkillDto";
import { SkillEntity } from "app/entities/SkillEntity";

export function getSkills({ storages }: AppServices) {
  return async (
    req: Request,
    res: Response<GetSkillsResponse>,
    next: NextFunction
  ) => {
    try {
      const data: SkillEntity[] = await storages.skillsStorage.getAll();
      const skills: SkillDto[] = data.map((entity) => entityToDto(entity));
      res.status(200).json({ skills });
    } catch (error) {
      next(error);
    }
  };
}

export type GetSkillsResponse = {
  skills: SkillDto[];
};
