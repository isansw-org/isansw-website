import { FormHeader, FormSection } from "@/components/form";
import { SignInForm, SignInLayout } from "./_components";

export default function Page() {
  return (
    <SignInLayout>
      <FormSection className="space-y-6">
        <FormHeader
          title="Sign In"
          description="Enter your credentials below."
        />
        <SignInForm />
      </FormSection>
    </SignInLayout>
  );
}
