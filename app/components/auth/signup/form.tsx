import { data, Form, type ActionFunctionArgs } from "react-router";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { prisma } from "~/lib/prisma";
import { signupSchema } from "~/types/auth/signupSchema";
import bcrypt from "bcryptjs";

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
