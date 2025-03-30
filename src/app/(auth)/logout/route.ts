import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  (await cookies()).set("token", "", { maxAge: -1, path: "/sign-in" });

  return NextResponse.json({ message: "Logged out." });
}
