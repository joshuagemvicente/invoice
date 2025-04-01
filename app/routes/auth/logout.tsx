import type { ActionFunctionArgs } from "react-router";
import { destroySession, getSession } from "~/sessions.server";

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession("Cookie");
}
