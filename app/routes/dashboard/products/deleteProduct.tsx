import { data, redirect, type ActionFunctionArgs } from "react-router";
import { prisma } from "~/lib/prisma";

export async function action({ request, params }: ActionFunctionArgs) {
  const method = request.method;

  if (method === "DELETE") {
    await prisma.product.delete({
      where: {
        id: params.id,
      },
    });
  }

  return redirect("dashboard/products");
}
