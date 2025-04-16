import { AlertCircle } from "lucide-react";

export function ErrorAlert({
  message,
}: {
  message: string | undefined | null;
}) {
  if (!message) return undefined;
  return (
    <div className="text-red-600 bg-red-600/15 rounded-lg py-2 border border-red-600 flex items-center justify-center my-2 shadow-md">
      <AlertCircle className="mr-2" />
      {message}
    </div>
  );
}
