import { Role } from "@/lib/constants/roles";
import { auth } from "@/lib/security/auth";
import { Session } from "next-auth";

const ROLE_LEVEL: Record<Role, number> = {
  User: 1,
  Admin: 2,
  Superuser: 3,
};

export async function internal_authorize(params: {
  loggedIn: boolean;
  hasRole?: Role;
}): Promise<{
  accessAllowed: boolean;
  message: string;
  session: Session | null;
}> {
  const session = await auth();

  try {
    if (params.loggedIn) {
      if (!session) {
        throw new Error("You must be authenticated to access this resource.");
      }

      if (session.user.isAccountDisabled) {
        throw new Error(
          "You cannot access this resource on a disabled account."
        );
      }

      if (params.hasRole) {
        const requiredLevel = ROLE_LEVEL[params.hasRole];
        const userLevel = ROLE_LEVEL[session.user.role];

        if (userLevel < requiredLevel) {
          throw new Error(
            "You do not have the required privileges to access this resource."
          );
        }
      }
    } else {
      if (session) {
        throw new Error(
          "You cannot access this resource while you're logged in."
        );
      }
    }

    return {
      accessAllowed: true,
      message: "You are allowed to access this resource",
      session,
    };
  } catch (error) {
    if (error instanceof Error) {
      return { accessAllowed: false, message: error.message, session };
    }
    return {
      accessAllowed: false,
      message: "Something went wrong...",
      session,
    };
  }
}
