import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email("Email is required."),
  username: z.string().min(1, "Username is required."),
  password: z.string().min(1, "Password is required."),
});
