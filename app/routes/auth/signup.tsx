import { useEffect } from "react";
import {
  Form,
  useActionData,
  type ActionFunctionArgs,
  redirect,
  data,
  Link,
} from "react-router";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { prisma } from "~/lib/prisma";
import { signupSchema } from "~/types/auth/signupSchema";
import bcrypt from "bcryptjs";
import { toast } from "sonner";

import {
  CheckCircle2,
  User,
  AtSign,
  ArrowRight,
  Github,
  Twitter,
  Linkedin,
  Lock,
} from "lucide-react";

export async function action({ request }: ActionFunctionArgs) {
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
    return data(
      { info: "Try changing your username or email to proceed." },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(userPassword, 10);

  await prisma.user.create({
    data: {
      email: normalizedEmail,
      username: normalizedUsername,
      password: hashedPassword,
    },
  });

  setTimeout(() => {
    redirect("login");
  }, 2000);

  return data({ success: "Account successfully created" }, { status: 201 });
}

export default function Signup() {
  const actionData = useActionData();

  useEffect(() => {
    if (actionData) {
      if (actionData.error) {
        toast.error(actionData.error);
      } else if (actionData.info) {
        toast.info(actionData.info);
      } else if (actionData.success) {
        toast.success(actionData.success);
      }
    }
  }, [actionData]);

  return (
    <div className="w-full h-screen flex justify-center items-center ">
      <div className="w-full max-w-4xl mx-auto overflow-hidden rounded-2xl shadow-xl">
        <div className="grid md:grid-cols-2">
          {/* Brand Section */}
          <div className="relative hidden md:flex flex-col justify-between bg-gradient-to-br from-primary/90 to-primary p-8 text-white">
            <div>
              <div className="font-bold text-xl mb-2">ProductSphere</div>
              <h2 className="text-3xl font-bold mb-6">
                Start your journey with us today
              </h2>
              <p className="opacity-80">
                Join thousands of startups and businesses already using our
                platform to scale their operations.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary-foreground" />
                <span>30-day free trial</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary-foreground" />
                <span>No credit card </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary-foreground" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-8 bg-white dark:bg-gray-900">
            <div className="space-y-2 mb-6">
              <h1 className="text-2xl font-bold">Create your account</h1>
              <p className="text-muted-foreground">
                Enter your information to get started
              </p>
            </div>

            <Form method="post" className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    name="username"
                    placeholder="johndoe"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    className="pl-10"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Password must be at least 8 characters long
                </p>
              </div>

              <Button type="submit" className="w-full group">
                Create Account
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

              <div className="text-center text-sm">
                <p className="text-muted-foreground">
                  By signing up, you agree to our{" "}
                  <Link href="#" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </Form>

            <div className="mt-6 text-center text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary font-medium hover:underline"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
