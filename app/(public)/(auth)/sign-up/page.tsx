import { FormHeader, FormSection } from "@/components/form";
import { SignUpLayout } from "./_components/sign-up-layout";
import { SignUpForm } from "./_components/sign-up-form";
import { SearchParams } from "next/dist/server/request/search-params";
import { getSearchParam } from "@/lib/utils/params";
import { isString } from "@/lib/utils/type-guards";
import { decryptURLSafe } from "@/lib/security/encryption";
import { UserInvitationPayload, verifyJWT } from "@/lib/security/jwt";
import { Unauthorized } from "@/components/common/fallbacks/unauthorized";
import { notFound } from "next/navigation";

type Props = {
  searchParams?: SearchParams;
};

export default async function Page({ searchParams }: Props) {
  const token = await getSearchParam({
    params: searchParams,
    key: "token",
    default: "",
    validate: isString,
  });

  if (!token) return notFound();

  const jwt = decryptURLSafe(token);
  const payload = verifyJWT<UserInvitationPayload>(jwt);
  if (!payload) {
    return (
      <Unauthorized
        message="Invalid or expired token."
        fallbackBtnText="Return to Home"
        fallbackUrl="/"
      />
    );
  }

  return (
    <SignUpLayout>
      <FormSection className="space-y-6">
        <FormHeader
          title="Sign Up"
          description="Please fill in your details so we can get your account immediately setup for you."
        />
        <SignUpForm />
      </FormSection>
    </SignUpLayout>
  );
}
