import type { ActionFunctionArgs } from "react-router";

export async function action({ request, params }: ActionFunctionArgs) {
  const productId = params.id;
  const formData = request.formData();
}
