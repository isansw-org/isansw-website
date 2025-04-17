"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Eye, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { pages } from "@/lib/constants/site";
import { AdminBreadcrumb } from "./admin-breadcrumb";

export function AdminHeader() {
  const router = useRouter();

  async function handleLogout() {
    // const response = await logout();
    // if (response.success) {
    //   toast.success(response.message);
    //   router.push(sitePages.auth.login.url);
    // } else {
    //   toast.error(response.message);
    // }
  }

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-muted-foreground/50 bg-neutral-900 px-4">
      <div className="flex items-center">
        <SidebarTrigger />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <AdminBreadcrumb />
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" asChild>
          <Link target="_blank" href={pages.public.home.url}>
            Preview Site <Eye />
          </Link>
        </Button>
        <Button variant="outline" onClick={handleLogout}>
          Logout <LogOut />
        </Button>
      </div>
    </header>
  );
}
