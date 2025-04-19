import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SearchX } from "lucide-react";
import { Center } from "@/components/common/whitespacing";

export default function NotFound() {
  return (
    <Center>
      <div className="space-y-4">
        <SearchX className="w-16 h-16 justify-self-center" />
        <div className="space-y-4 text-center border-2 p-8 rounded-xl">
          <h1 className="text-3xl font-bold">404</h1>
          <p className="text-lg">Page not found.</p>
        </div>
        <Button className="w-full text-lg" asChild>
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </Center>
  );
}
