import { Button } from "@/components/ui/button";
import { Center } from "../whitespacing";
import Link from "next/link";
import { Lock } from "lucide-react";

type Props = {
  message: string;
  fallbackBtnText: string;
  fallbackUrl: string;
};

export function Unauthorized({ message, fallbackBtnText, fallbackUrl }: Props) {
  return (
    <Center>
      <div className="space-y-4">
        <Lock className="w-16 h-16 justify-self-center" />
        <div className="space-y-4 text-center border-2 p-8 rounded-xl">
          <h1 className="text-3xl font-bold">Unauthorized</h1>
          <p className="text-lg">{message}</p>
        </div>
        <Button className="w-full text-lg" asChild>
          <Link href={fallbackUrl}>{fallbackBtnText}</Link>
        </Button>
      </div>
    </Center>
  );
}
