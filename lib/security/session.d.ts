import { DefaultSession } from "next-auth";
import { Role } from "../constants/roles";

export type ExtendedUser = DefaultSession["user"] & {
  role: Role;
  fullName: string;
  isAccountDisabled: boolean;
  twoFactorEnabled: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
