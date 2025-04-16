import { ArrowLeft, LockKeyholeOpenIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  returnUrl: string;
  returnPageLabel: string;
};

export const FormOuterNav = ({ returnUrl, returnPageLabel }: Props) => {
  return (
    <div className="justify-self-center space-y-6">
      <LockKeyholeOpenIcon className="justify-self-center w-18 h-18" />
      <h1 className="text-5xl font-bold">ISANSW</h1>
      <p className="text-lg text-muted-foreground hover:text-primary hover:underline">
        <Link
          href={returnUrl}
          className="flex justify-center items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5 translate-y-0.5" /> Return to{" "}
          {returnPageLabel}
        </Link>
      </p>
    </div>
  );
};
