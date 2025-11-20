import { Request, Response, NextFunction } from "express";
import { AppServices } from "app/app-services";
import { entityToDto, createSkillSchema } from "app/api/dtos/SkillDto";

export function createSkill({ storages }: AppServices) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newSkill = createSkillSchema.parse(req.body);
      const data = await storages.skillsStorage.insert(newSkill);
      const skill = entityToDto(data);
      res.status(201).json(skill);
    } catch (error) {
      next(error);
    }
  };
}
