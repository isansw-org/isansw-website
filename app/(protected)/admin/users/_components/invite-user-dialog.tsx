"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useOpenCloseStore } from "@/hooks/use-openclose-store";
import { Plus } from "lucide-react";
import { InviteUserForm } from "./invite-user-form";

export function InviteUserDialog() {
  const { isOpen, setIsOpen, open } = useOpenCloseStore();
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={open} size="lg" className="flex items-center">
          <Plus />
          Invite User
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite a New User</DialogTitle>
          <DialogDescription>
            We will send a registration link to the email of the invitee. They
            have 24 hours until the link expires.
          </DialogDescription>
        </DialogHeader>
        <InviteUserForm />
      </DialogContent>
    </Dialog>
  );
}
