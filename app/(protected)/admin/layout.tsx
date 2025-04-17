import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";
import { AdminHeader, AdminSidebar } from "./_components";

type Props = {
  children: ReactNode;
};

export default function AdminLayout({ children }: Props) {
  return (
    <div className="dark">
      <SidebarProvider>
        <AdminSidebar />
        <SidebarInset>
          <AdminHeader />
          <div className="p-16">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
