import { createCookieSessionStorage, redirect } from "react-router";

type SessionData = {
  userId: string;
};
type SessionFlashData = {
  error: string;
};

export const { commitSession, getSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "__session",
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secrets: [process.env.SESSION_SECRET],
      secure: process.env.NODE_ENV === "production",
    },
  });

async function getsession(request: Request) {
  const cookie = request.headers.get("cookie");
  return sessionStorage.getItem(cookie);
}

export async function logout(request: Request) {
  const session = await getSession(request);
  return redirect("/login", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}
