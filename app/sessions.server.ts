import { createCookieSessionStorage } from "react-router";

type SessionData = {
  userId: string;
};
type SessionFlashData = {
  error: string;
};

export const { commitSession, getSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      name: "__session",
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secrets: [process.env.SESSION_SECRET],
      secure: process.env.NODE_ENV === "production",
    },
  });

export async function logout() {}
