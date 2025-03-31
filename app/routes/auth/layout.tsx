import { Outlet } from "react-router";
import { Toaster } from "sonner";

export function meta() {
  return [
    { title: "Authentication Layout" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}
export default function AuthLayout() {
  return (
    <main className="">
      <section>
        <Outlet />
      </section>
      <Toaster expand={false} position="top-right" richColors closeButton />
    </main>
  );
}
