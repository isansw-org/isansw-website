import { authorize } from "@/server/actions/auth.actions";
import { redirect } from "next/navigation";
import EventForm from "./_components/event-form";

export const dynamic = "force-dynamic";

export default async function Page() {
  const { accessAllowed, session } = await authorize({ loggedIn: true });
  if (!accessAllowed || !session) {
    redirect("/sign-in");
  }

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-foreground">
        Welcome to the Events Dashboard, {session.user.fullName}! 🎉
      </h1>
      <p className="text-lg text-muted-foreground">
        Here you can view, create, and manage events.
      </p>

      <EventForm />
    </div>
  );
}
