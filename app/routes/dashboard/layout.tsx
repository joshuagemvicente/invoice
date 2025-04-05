import { Separator } from "~/components/ui/separator";
import { Outlet } from "react-router";
import { Toaster } from "sonner";
import { DashboardSidebar } from "~/components/dashboard/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
  Form,
  redirect,
  useLoaderData,
  type LoaderFunctionArgs,
} from "react-router";
import { getSession, sessionStorage } from "~/sessions.server";
import { prisma } from "~/lib/prisma";
import type { User } from "@prisma/client";
// import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";

export function meta() {
  return [
    { title: "Dashboard Layout" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export type DashboardLoaderData = {
  user: { username: string } | null;
};

async function getUserById(id: string): Promise<User | null> {
  if (!id) return null;
  try {
    // Ensure you are querying by the correct field (id vs username)
    const user = await prisma.user.findUnique({
      where: { id: id }, // Assuming session stores the ID
      // select: { username: true } // Good practice to select only needed fields
    });
    return user;
  } catch (error) {
    console.error("Failed to get user by ID:", error);
    return null;
  }
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request);
  const userId = session.get("userId");

  if (!userId || typeof userId !== "string") {
    // Throw redirects to properly handle them
    throw redirect("/login");
  }

  const user = await getUserById(userId);

  if (!user) {
    // Destroy session and redirect
    return redirect("/login", {
      headers: {
        "Set-Cookie": await sessionStorage.destroySession(session),
      },
    });
  }

  const responseData: DashboardLoaderData = {
    user: { username: user.username },
  };

  return responseData;
};

export default function DashboardLayout() {
  const data = useLoaderData<typeof loader>(); // Use generic for type safety
  const username = data?.user?.username;
  return (
    <SidebarProvider>
      <DashboardSidebar username={username} />
      <main className="w-full h-full">
        <div className="w-full p-3.5 flex justify-between items-center">
          <div>
            <SidebarTrigger />
          </div>
          <div className="flex gap-1.5 items-center">
            <Input type="text" placeholder="Search" />
          </div>
        </div>
        <Separator />
        <div className="p-5">
          <Outlet />
        </div>
        <Toaster expand={false} position="top-right" richColors closeButton />
      </main>
    </SidebarProvider>
  );
}
