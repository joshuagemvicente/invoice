import { data, redirect, type ActionFunctionArgs } from "react-router";
import { prisma } from "~/lib/prisma";

export async function action({ params }: ActionFunctionArgs) {
  const productId = params.id;

  if (!productId) {
    throw new Response("Product ID is required", { status: 400 });
  }

  await prisma.product.delete({
    where: {
      id: productId,
    },
  });

  return redirect("/dashboard/products");
}
