"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Eye, LogOut } from "lucide-react";
import Link from "next/link";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { pages } from "@/lib/constants/site";
// import { useRouter } from "next/navigation"; // ⬅️ remove for now
import { AdminBreadcrumb } from "./admin-breadcrumb";

export function AdminHeader() {
  // const router = useRouter(); // ⬅️ remove for now

  async function handleLogout() {
    // Backend not wired yet — no redirect.
    // You can toast here if you have a toast system:
    // toast.info("Logout coming soon");
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
