import { redirect, type ActionFunctionArgs } from "react-router";
import { getSession } from "~/sessions.server";
import { sessionStorage } from "~/sessions.server";

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request);

  return redirect("/login", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}
