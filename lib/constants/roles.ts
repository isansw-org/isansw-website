export const roleOptions = ["User", "Admin", "Superuser"] as const;

export type Role = (typeof roleOptions)[number];

export const roleDescriptions: Record<Role, string> = {
  User: "Able to update the website's dynamic contents.",
  Admin: "Inherits the User role; able to manage all users except superusers.",
  Superuser:
    "Inherits the User and Admin roles; cannot be managed by admins; able to manage other superusers.",
} as const;
