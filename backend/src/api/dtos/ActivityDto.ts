import { z } from "zod";
import { ActivitiesEntity, preparation } from "app/entities/ActivitiesEntity";

export const activityDto = z.object({
  id: z.number(),
  title: z.string().min(1),
  summary: z.string().min(1),
  image_path: z.string().min(1),
  first_skill: z.string().min(1),
  second_skill: z.string().nullable().optional(),
  age: z.number(),
  preparation,
  updatedAt: z.string(),
});

export function entityToDto(entity: ActivitiesEntity): ActivityDto {
  return {
    ...entity,
    updatedAt: entity.updatedAt.toISOString(),
  };
}

export const createActivitySchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  image_path: z.string().min(1),
  first_skill: z.string().min(1),
  second_skill: z.string().nullable().optional(),
  age: z.number(),
  preparation,
});

export type ActivityDto = z.infer<typeof activityDto>;
