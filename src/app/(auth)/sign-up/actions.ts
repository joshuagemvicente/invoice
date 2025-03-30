"use server";

import { prisma } from "@/lib/prisma";
import { signupSchema } from "@/types/authSchema";
import { hashPassword } from "@/lib/auth";

export async function signUp(formData: FormData) {
  try {
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    if (!username || !email || !password) {
      return { error: "All fields are required." };
    }

    const parsedData = signupSchema.safeParse({
      username,
      email,
      password,
    });

    if (!parsedData.success) {
      const errorMessages = parsedData.error.format();
      return { errorMessages };
    }

    const {
      email: userEmail,
      username: uName,
      password: userPassword,
    } = parsedData.data;

    const normalizedEmail = userEmail.toLowerCase();
    const normalizedUsername = uName.toLowerCase();

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: normalizedEmail }, { username: normalizedUsername }],
      },
    });

    if (existingUser) {
      return {
        error: { general: "User already exists with this email or username." },
      };
    }

    const hashedPassword = await hashPassword(userPassword);

    await prisma.user.create({
      data: {
        username: normalizedUsername,
        email: normalizedEmail,
        password: hashedPassword,
      },
    });

    return { success: "Signed up successfully!" };
  } catch (error) {
    console.error("Sign-up error:", error);
    return { error: { general: "Internal server error." } };
  }
}
