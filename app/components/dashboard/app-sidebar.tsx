import { useState } from "react";
import {
  Package,
  Boxes,
  Container,
  Home,
  Sheet,
  Settings,
  ChevronUp,
  User2,
} from "lucide-react";

import { Button } from "~/components/ui/button";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { Form } from "react-router";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Separator } from "../ui/separator";

const items = [
  {
    title: "Dashboard",
    url: "dashboard",
    icon: Home,
  },
  {
    title: "Products",
    url: "dashboard/products",
    icon: Package,
  },
  {
    title: "Categories",
    url: "dashboard/categories",
    icon: Boxes,
  },
  {
    title: "Suppliers",
    url: "dashboard/suppliers",
    icon: Container,
  },
  {
    title: "Reports",
    url: "dashboard/reports",
    icon: Sheet,
  },
  {
    title: "Settings",
    url: "dashboard/settings",
    icon: Settings,
  },
  {
    title: "Profile",
    url: "dashboard/profile",
    icon: User2,
  },
];

interface DashboardSidebarProps {
  username?: string | null;
}

export function DashboardSidebar({ username }: DashboardSidebarProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSignoutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setDialogOpen(true);
  };

  const displayUsername = username;

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>IMS</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-3">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                  <Separator className="w-full" />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> {displayUsername}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <div
                  className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 "
                  onClick={handleSignoutClick}
                >
                  <span>Sign out</span>
                </div>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you sure?</DialogTitle>
                      <DialogDescription>
                        You will need to relogin again.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button
                        className="cursor-pointer"
                        variant="outline"
                        onClick={() => setDialogOpen(false)}
                      >
                        Close
                      </Button>
                      <Form method="post" action="/logout">
                        <Button type="submit" variant="destructive">
                          Logout
                        </Button>
                      </Form>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
