import { getUserByEmail, getUserById } from "@/server/actions/user.actions";
import env from "../utils/env";
import Credentials from "next-auth/providers/credentials";
import NextAuth, { NextAuthConfig } from "next-auth";
import { compareWithHash } from "./hashing";
import { pages } from "../constants/site";
import { Role } from "../constants/roles";

/**
 * NextAuth configuration options.
 *
 * @property secret - The secret key used for signing and verifying tokens. (Retrieved from an environment variable)
 * @property providers - An array of authentication providers to use.
 */
export const authConfig = {
  secret: env.AUTH_SECRET,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;
        const user = await getUserByEmail(credentials.email as string);
        if (
          user &&
          (await compareWithHash(
            credentials.password as string,
            user.PasswordHash
          ))
        ) {
          return {
            id: String(user.Id),
            name: user.FullName,
            email: user.Email,
          };
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;

/**
 * NextAuth instance with configuration options.
 *
 * @property session - Configuration for the NextAuth session.
 *   - `strategy` - The strategy to use for session management (set to "jwt" for JSON Web Tokens).
 * @property pages - Configuration for custom login and sign-out pages.
 *   - `signIn` - The URL for the sign-in page (set to sitePages.auth.login).
 * @property callbacks - Callbacks for modifying sessions and tokens.
 * @property ...authConfig - Spreads the authConfig object properties into the NextAuth configuration.
 */
export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt" },
  pages: {
    signIn: pages.public.signIn.url,
  },
  callbacks: {
    async signIn({ user }) {
      if (!user) {
        return false;
      }

      // prompt 2fa

      return true;
    },
    async session({ session, token }) {
      // Extend the user session with the user's id
      // Useful for operations that require the user's id.
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      // Extend the user session with the user's role
      // Useful for Role-Based Access Control (RBAC)
      if (token.role && session.user) {
        session.user.role = token.role as Role;
      }

      // Extend the user's session with the user's account revocation status
      // Primarily used to reject access for disabled accounts
      if (token.isAccountDisabled && session.user) {
        session.user.isAccountDisabled = token.isAccountDisabled as boolean;
      }

      // Extend the user's session with the user's full name
      if (token.fullName && session.user) {
        session.user.fullName = token.fullName as string;
      }

      // Extend the user's session with the user's two-factor authentication status
      if (token.twoFactorEnabled && session.user) {
        session.user.twoFactorEnabled = token.twoFactorEnabled as boolean;
      }

      return session;
    },
    async jwt({ token }) {
      try {
        // if signed out, simply return token
        if (!token.sub) return token;

        const user = await getUserById(Number(token.sub));
        if (!user) return token;

        token.role = user.Role;
        token.fullName = user.FullName;
        token.isAccountDisabled = user.IsAccountDisabled;
        token.twoFactorEnabled = user.TwoFactorEnabled;
      } finally {
        return token;
      }
    },
  },
  ...authConfig,
});
