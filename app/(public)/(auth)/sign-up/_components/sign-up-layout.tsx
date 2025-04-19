import { Center } from "@/components/common/whitespacing";
import { FormOuterNav } from "@/components/form";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const SignUpLayout = ({ children }: Props) => {
  return (
    <Center>
      <div className="my-24 grid space-y-12 w-full md:max-w-lg max-w-md">
        <FormOuterNav returnUrl="/" returnPageLabel="Home" />
        {children}
      </div>
    </Center>
  );
};
