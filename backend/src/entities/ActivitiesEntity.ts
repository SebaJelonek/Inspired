import { z } from "zod";

export const activitiesEntitySchema = z.object({
  id: z.number(),
  title: z.string().min(1),
  summary: z.string().min(1),
  image_path: z.string().min(1),
  first_skill: z.string().min(1),
  second_skill: z.string().nullable().optional(),
  age: z.number(),
  preparation: z.enum(["Low", "Medium", "High"]),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
});

export type ActivitiesEntity = z.infer<typeof activitiesEntitySchema>;
