import { NavUser } from "@/components/Sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { RootState } from "@/store";
import { BrainCircuit, ContactRound, FileText, Home } from "lucide-react";
import * as React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router";

const navItems = [
  {
    name: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    name: "Interview Spaces",
    url: "/dashboard/interview-workspace",
    icon: ContactRound,
  },
  {
    name: "Application Enhancer",
    url: "/dashboard/application-enhancer",
    icon: FileText,
  },
  {
    name: "Cover Letter",
    url: "/dashboard/cover-letter",
    icon: FileText,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useSelector((root: RootState) => root.user);
  const { pathname } = useLocation();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="bg-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <BrainCircuit className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">MockVerse</span>
            <span className="truncate text-xs">AI Interview Prep</span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton isActive={pathname === item.url} tooltip={item.name} asChild>
                  <Link to={item.url}>
                    <item.icon />
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
