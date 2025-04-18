"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { pages } from "@/lib/constants/site";

type NavItem = {
  label: string;
  url: string;
  isActive?: boolean;
};

type NavGroup = {
  group: string;
  items: NavItem[];
};

export const sidebarNavItems: NavGroup[] = [
  {
    group: "General",
    items: [
      pages.protected.dashboard,
      pages.protected.manageEvents,
      pages.protected.manageAnnouncements,
      pages.protected.manageSponsors,
    ],
  },
  {
    group: "Management",
    items: [pages.protected.manageUsers],
  },
];

export function AdminSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props} className="border-neutral-600 bg-black">
      <SidebarHeader className="mt-4 mx-2">
        <h1 className="font-bold text-2xl">ISANSW</h1>
        <p className="text-md">Administrative Panel</p>
      </SidebarHeader>
      <SidebarContent>
        {sidebarNavItems.map((group) => (
          <SidebarGroup key={group.group}>
            <SidebarGroupLabel className="text-sm">
              {group.group}
            </SidebarGroupLabel>
            <Separator className="mb-4" />
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      className="text-lg hover:bg-muted"
                      asChild
                      isActive={item.isActive}
                    >
                      <a href={item.url}>{item.label}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
