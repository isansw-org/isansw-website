import { Center } from "@/components/common/whitespacing";
import { FormHeader, FormSection } from "@/components/form";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const SignInLayout = ({ children }: Props) => {
  return (
    <Center>
      <FormSection>
        <FormHeader
          title="Sign In"
          description="Enter your credentials below."
        />
        <div className="mt-4">{children}</div>
      </FormSection>
    </Center>
  );
};
