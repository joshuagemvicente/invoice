import { Form, useActionData, type ActionFunctionArgs } from "react-router";
import { loginSchema } from "~/types/auth/loginSchema";
import { prisma } from "~/lib/prisma";
import bcrypt from "bcryptjs";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { toast } from "sonner";
import { useEffect } from "react";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");

  const parse = loginSchema.safeParse({ username, password });

  if (!parse.success) {
    const errorMessages = parse.error.format();
    return { errorMessages };
  }

  const { username: uName, password: userPassword } = parse.data;

  const user = await prisma.user.findUnique({
    where: {
      username: uName,
    },
  });

  if (!user) {
    return { error: "Invalid username or password." };
  }

  const isValidPassword = bcrypt.compare(userPassword, user.password);

  if (!isValidPassword) {
    return { error: "Invalid username or password." };
  }
}

export default function Login() {
  const actionData = useActionData();

  useEffect(() => {
    if (actionData) {
      if (actionData.error) {
        toast.error;
      } else if (actionData.success) {
        toast.success;
      }
    }
  });

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Form method="post">
        <div>
          <Label htmlFor="username">Username</Label>
          <Input type="text" name="username" />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input type="password" name="password" />
        </div>
        <Button className="w-full" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
}
