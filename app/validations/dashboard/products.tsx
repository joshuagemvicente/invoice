import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  category: z.string(),
  price: z.number(),
  stock: z.number(),
});

export const updateProductSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.number(),
  category: z.string().optional(),
  stock: z.number(),
});
