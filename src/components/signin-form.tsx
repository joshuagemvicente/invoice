"use client";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function SignInForm() {
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <form method="post">
        <div>
          <Label htmlFor="username">Username</Label>
          <Input type="text" />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input type="password" />
        </div>
        <Button className="w-full" type="submit">
          {loading ? "Signing In..." : "Login"}
        </Button>
      </form>
    </div>
  );
}
