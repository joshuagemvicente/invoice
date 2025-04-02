import { Outlet } from "react-router";
import { Toaster } from "sonner";
import { DashboardSidebar } from "~/components/dashboard/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";

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
      <main className="">
        <SidebarTrigger />
        <section>
          <Outlet />
        </section>
        <Toaster expand={false} position="top-right" richColors closeButton />
      </main>
    </SidebarProvider>
  );
}
