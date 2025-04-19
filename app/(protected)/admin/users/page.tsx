import { InviteUserDialog } from "./_components";

export default function Page() {
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-foreground">Users</h1>
        <InviteUserDialog />
      </div>
    </>
  );
}
