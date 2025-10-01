import NextAuth from "next-auth";
// If you're not ready for providers yet, keep them commented out
// import Google from "next-auth/providers/google";

export const runtime = "nodejs"; // ensure Node runtime on Vercel
export const dynamic = "force-dynamic"; // don't try to prerender this

const handler = NextAuth(() => {
  // ✅ Read env at runtime; no top-level imports that validate
  const secret =
    process.env.NEXTAUTH_SECRET ??
    (process.env.NODE_ENV === "production"
      ? (() => {
          throw new Error("NEXTAUTH_SECRET is missing");
        })()
      : "dev-secret");

  return {
    secret,
    // Uncomment providers only when you have real keys set in Vercel
    // providers: [
    //   Google({
    //     clientId: process.env.GOOGLE_CLIENT_ID!,
    //     clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    //   }),
    // ],
  };
});

export { handler as GET, handler as POST };
