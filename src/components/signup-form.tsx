"use client";
import { useState } from "react";
import { signUp } from "@/app/(auth)/sign-up/actions";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";

export function SignupForm() {
  // set states for success and error messages
  const [message, setMessage] = useState<string | null>(null);
  // set state for processing data
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(event.currentTarget);
    const response = (await signUp(formData)) || {
      error: "Unexpected error occurred.",
    };

    if (response.error) {
      setMessage(response.error);
    } else {
      toast.success(response.success);
      // setMessage(response.success);
      setTimeout(() => {
        window.location.href = "/sign-in"; // Redirect to login
      }, 2000);
    }
    setLoading(false);
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input type="email" name="email" required />
        </div>
        <div>
          <Label htmlFor="usernmae">Username</Label>
          <Input type="text" name="username" required />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input type="password" name="password" required />
        </div>
        <Button className="w-full" type="submit">
          {loading ? "Signing up..." : "Get Started"}
        </Button>
      </form>
    </div>
  );
}
