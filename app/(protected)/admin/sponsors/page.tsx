import { authorize } from "@/server/actions/auth.actions";
import { redirect } from "next/navigation";
import SponsorForm from "./_components/sponsors-form";

export default async function Page() {
  const { accessAllowed, session } = await authorize({ loggedIn: true });
  if (!accessAllowed || !session) {
    redirect("/sign-in");
  }

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-foreground">
        ISA NSW Sponsor Partners Dashboard, {session.user.fullName}! 🤝
      </h1>
      <p className="text-lg text-muted-foreground">
        Manage partners offering discounts for PPIA card holders
      </p>

      <SponsorForm />
    </div>
  );
}