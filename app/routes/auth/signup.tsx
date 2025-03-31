import type { Route } from "./+types/signup";
import { SignupForm } from "~/components/auth/signup/form";
export default function Signup() {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <SignupForm />
    </div>
  );
}
