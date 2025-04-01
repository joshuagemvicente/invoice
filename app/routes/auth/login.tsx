import { useEffect } from "react";
import {
  data,
  Form,
  Link,
  redirect,
  useActionData,
  type ActionFunctionArgs,
} from "react-router";
import { loginSchema } from "~/types/auth/loginSchema";
import { prisma } from "~/lib/prisma";
import bcrypt from "bcryptjs";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { toast } from "sonner";
import { getSession, sessionStorage } from "~/sessions.server";
import { Separator } from "~/components/ui/separator";
import {
  ShieldCheck,
  AtSign,
  ArrowRight,
  Github,
  Twitter,
  Linkedin,
  Lock,
} from "lucide-react";
import { Checkbox } from "~/components/ui/checkbox";

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
    return data({ error: "Invalid username or password." }, { status: 404 });
  }

  const isValidPassword = await bcrypt.compare(userPassword, user.password);

  if (!isValidPassword) {
    return data({ error: "Invalid username or password." }, { status: 404 });
  }

  const session = await getSession(request);
  session.set("userId", user.id);

  return redirect("/dashboard", {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}

export default function Login() {
  const actionData = useActionData();

  useEffect(() => {
    if (actionData) {
      if (actionData.error) {
        toast.error(actionData.error);
      } else if (actionData.success) {
        toast.success(actionData.success);
      }
    }
  }, [actionData]);

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="w-full max-w-4xl mx-auto overflow-hidden rounded-2xl shadow-xl">
        <div className="grid md:grid-cols-2">
          {/* Brand Section */}
          <div className="relative hidden md:flex flex-col justify-between bg-gradient-to-br from-primary/90 to-primary p-8 text-white">
            <div>
              <div className="font-bold text-xl mb-2">ProductSphere</div>
              <h2 className="text-3xl font-bold mb-6">Welcome back</h2>
              <p className="opacity-80">
                Log in to your account to access your dashboard, projects, and
                settings.
              </p>
            </div>

            <div className="flex items-center gap-3 mt-8">
              <ShieldCheck className="h-6 w-6 text-primary-foreground" />
              <span className="text-sm">Secure, encrypted connection</span>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-8 bg-white dark:bg-gray-900">
            <div className="space-y-2 mb-6">
              <h1 className="text-2xl font-bold">Log in to your account</h1>
              <p className="text-muted-foreground">
                Enter your credentials to continue
              </p>
            </div>

            <Form method="post" className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    name="username"
                    type="username"
                    placeholder="johndoe"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm font-normal">
                  Remember me for 30 days
                </Label>
              </div>

              <Button type="submit" className="w-full group">
                Log In
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>

              <div className="relative my-4">
                <Separator />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 px-2 text-xs text-muted-foreground">
                  OR CONTINUE WITH
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <Button variant="outline" className="w-full">
                  <Github className="h-4 w-4 mr-2" />
                  Github
                </Button>
                <Button variant="outline" className="w-full">
                  <Twitter className="h-4 w-4 mr-2" />
                  Twitter
                </Button>
                <Button variant="outline" className="w-full">
                  <Linkedin className="h-4 w-4 mr-2" />
                  LinkedIn
                </Button>
              </div>
            </Form>

            <div className="mt-6 text-center text-sm">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-primary font-medium hover:underline"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
