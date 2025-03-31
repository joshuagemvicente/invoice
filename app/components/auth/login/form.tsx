import { Form } from "react-router";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
export function LoginForm() {
  return (
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
  );
}
