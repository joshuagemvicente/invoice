import { data, Form, type ActionFunctionArgs } from "react-router";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { prisma } from "~/lib/prisma";
import { signupSchema } from "~/types/auth/signupSchema";
import bcrypt from "bcryptjs";

async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");

  const parse = signupSchema.safeParse({
    username,
    email,
    password,
  });

  if (!parse.success) {
    const errorMessages = parse.error.format();
    return { errorMessages };
  }

  const {
    username: uName,
    email: userEmail,
    password: userPassword,
  } = parse.data;

  const normalizedEmail = userEmail.toLowerCase();
  const normalizedUsername = uName.toLowerCase();

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email: normalizedEmail }, { username: normalizedUsername }],
    },
  });

  if (existingUser) {
    return { error: "User already exists." };
  }

  const hashedPassword = await bcrypt.hash(userPassword, 10);

  await prisma.user.create({
    data: {
      email: normalizedEmail,
      username: normalizedUsername,
      password: hashedPassword,
    },
  });
}

export function SignupForm() {
  return (
    <Form method="post">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input type="email" name="email" />
      </div>
      <div>
        <Label htmlFor="username">Username</Label>
        <Input type="text" name="username" />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input type="password" name="password" />
      </div>
      <Button className="w-full" type="submit">
        Get Started
      </Button>
    </Form>
  );
}
