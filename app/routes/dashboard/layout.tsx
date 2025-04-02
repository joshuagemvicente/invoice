import { Separator } from "~/components/ui/separator";
import { Outlet } from "react-router";
import { Toaster } from "sonner";
import { DashboardSidebar } from "~/components/dashboard/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

export function meta() {
  return [
    { title: "Dashboard Layout" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}
export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="w-full h-full">
        <div className="w-full p-3.5 flex justify-between items-center">
          <div>
            <SidebarTrigger />
          </div>
          <div className="flex gap-1.5 items-center">
            <Input type="text" placeholder="Search" />
            <Button type="submit">Add Product</Button>
          </div>
        </div>
        <Separator />
        <Outlet />
        <Toaster expand={false} position="top-right" richColors closeButton />
      </main>
    </SidebarProvider>
  );
}
