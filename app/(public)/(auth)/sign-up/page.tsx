import { FormHeader, FormSection } from "@/components/form";
import { SignUpLayout } from "./_components/sign-up-layout";
import { SignUpForm } from "./_components/sign-up-form";
import { SearchParams } from "next/dist/server/request/search-params";
import { getSearchParam } from "@/lib/utils/params";
import { isString } from "@/lib/utils/type-guards";
import { Unauthorized } from "@/components/common/fallbacks/unauthorized";
import { notFound } from "next/navigation";
import { verifyToken } from "@/server/actions/auth.actions";
import { Button } from "@/components/ui/button";
import { FileBadge, FileBadge2, Info } from "lucide-react";
import Link from "next/link";
import { pages } from "@/lib/constants/site";

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

  const payload = await verifyToken(token);
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
    <SignUpLayout inviteeName={payload.fullName}>
      <FormSection className="space-y-6">
        <FormHeader
          title="Sign Up"
          description="Please fill in your details so we can get your account immediately setup for you."
        />
        <Button asChild className="w-full" variant="outline">
          <Link target="_blank" href={pages.public.termsOfService.url}>
            <FileBadge /> Terms of Service
          </Link>
        </Button>
        <div className="p-8 border border-primary/50 rounded-lg">
          <SignUpForm token={token} tokenPayload={payload} />
        </div>
      </FormSection>
    </SignUpLayout>
  );
}
