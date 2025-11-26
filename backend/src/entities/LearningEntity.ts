import { z } from "zod";

export const learningEntitySchema = z.object({
  id: z.number(),
  title: z.string().nonempty(),
  image_path: z.string().min(1),
  subTitle: z.string().nonempty(),
  summary: z.string().nonempty(),
  content: z.string().nonempty(),
  conclusion: z.string(),
  age: z.number(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
});
