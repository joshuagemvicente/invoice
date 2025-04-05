import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  // products: z.array().optional(),
  isActive: z.boolean(),
});

export const updateCategorySchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  // products: z.array().optional(),
  isActive: z.boolean().optional(),
});
