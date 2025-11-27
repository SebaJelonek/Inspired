import { z } from "zod";

export const preparation = z.enum(["Low", "Medium", "High"]);

export const activitiesEntitySchema = z.object({
  id: z.number(),
  title: z.string().min(1),
  summary: z.string().min(1),
  image_path: z.string().min(1),
  first_skill: z.string().min(1),
  second_skill: z.string().nullable().optional(),
  age: z.number(),
  preparation,
  updatedAt: z.date(),
  isDeleted: z.boolean().default(false),
});

export type ActivitiesEntity = z.infer<typeof activitiesEntitySchema>;
