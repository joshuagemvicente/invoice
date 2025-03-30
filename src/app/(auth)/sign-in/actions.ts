"use server";
import { SignJWT } from "jose";
import { loginSchema } from "@/types/authSchema";
import { comparePassword } from "@/lib/auth";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function signIn(formData: FormData) {
  try {
    const username = formData.get("username");
    const password = formData.get("password");

    if (!username || !password) {
      return { error: "All fields are required." };
    }

    const parsedData = loginSchema.safeParse({ username, password });

    if (!parsedData.success) {
      return { error: "Invalid input data." };
    }

    const { username: uName, password: userPassword } = parsedData.data;

    const user = await prisma.user.findUnique({
      where: {
        username: uName,
      },
    });

    if (!user) {
      return { error: "Invalid username or password." };
    }

    cookies().set("token");
  } catch (error) {
    console.error(error);
  }
}
