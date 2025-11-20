import { z } from "zod";
import { SkillEntity, skillEntitySchema } from "app/entities/SkillEntity";

export const skillDto = z.object({
  skillId: z.number(),
  name: z.string().nonempty(),
  level: z.number().int(),
  updatedAt: z.string(),
});

export type SkillDto = z.infer<typeof skillDto>;

export function entityToDto(entity: SkillEntity): SkillDto {
  return {
    ...entity,
    updatedAt: entity.updateAt.toISOString(),
  };
}

export const createSkillSchema = z.object({
  name: z.string().nonempty(),
  level: z.number().int(),
});

export type CreateSkill = z.infer<typeof createSkillSchema>;
