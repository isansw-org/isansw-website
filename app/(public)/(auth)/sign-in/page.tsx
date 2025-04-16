import { FormHeader, FormSection } from "@/components/form";
import { SignInForm } from "./_components/sign-in-form";
import { SignInLayout } from "./_components/sign-in-layout";

export default function Page() {
  return (
    <SignInLayout>
      <FormSection className="">
        <FormHeader
          title="Sign In"
          description="Enter your credentials below."
        />
        <div className="mt-6">
          <SignInForm />
        </div>
      </FormSection>
    </SignInLayout>
  );
}
