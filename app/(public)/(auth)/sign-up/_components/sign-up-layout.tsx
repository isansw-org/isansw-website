import { Center } from "@/components/common/whitespacing";
import { FormOuterNav } from "@/components/form";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  inviteeName: string;
};

export const SignUpLayout = ({ children, inviteeName }: Props) => {
  return (
    <Center>
      <div className="my-24 grid space-y-12 w-full md:max-w-lg max-w-md">
        <div className="space-y-2">
          <p className="justify-self-center text-xl">Welcome aboard,</p>
          <p className="justify-self-center text-4xl font-bold">
            🎉 {inviteeName} 🎉
          </p>
        </div>
        {children}
      </div>
    </Center>
  );
};
