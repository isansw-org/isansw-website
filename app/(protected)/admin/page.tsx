import { authorize } from "@/server/actions/auth.actions";
import { redirect } from "next/navigation";

export default async function Page() {
  const { accessAllowed, session } = await authorize({ loggedIn: true });
  if (!accessAllowed || !session) {
    redirect("/sign-in");
  }

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-foreground">
        Hi, {session.user.fullName}! 👋
      </h1>
      <p className="text-lg text-muted-foreground">
        Use the following options to navigate the administrative dashboard.
      </p>
    </div>
  );
}
