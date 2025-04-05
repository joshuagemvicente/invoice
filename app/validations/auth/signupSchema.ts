import { z } from "zod";

export const signupSchema = z.object({
  email: z.string(),
  username: z.string(),
  password: z.string(),
});
