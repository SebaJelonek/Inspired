import { z } from "zod";

export const skillEntitySchema = z.object({
  skillId: z.number(),
  name: z.string().nonempty(),
  level: z.number().int(),
  updateAt: z.date(),
});

export type SkillEntity = z.infer<typeof skillEntitySchema>;
