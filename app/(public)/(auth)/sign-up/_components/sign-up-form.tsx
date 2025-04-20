"use client";

import { FormError, FormSubmitButton } from "@/components/form";
import { CheckboxField, StringField } from "@/components/form/fields";
import { Form } from "@/components/ui/form";
import { useFormStore } from "@/hooks/use-form-store";
import { pages } from "@/lib/constants/site";
import { UserInvitationPayload } from "@/lib/security/jwt";
import {
  rateLimit_defaultErrorMessage,
  rateLimitExceeded,
} from "@/lib/security/ratelimit";
import server from "@/server";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z
  .object({
    fullName: z.string().min(1, { message: "Full name is required." }),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z.string(),
    agreeToToS: z.literal(true),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type FormSchema = z.infer<typeof formSchema>;

type Props = {
  token: string;
  tokenPayload: UserInvitationPayload;
};

export const SignUpForm = ({ token, tokenPayload }: Props) => {
  const { setError, setLoading } = useFormStore();
  const router = useRouter();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: tokenPayload.fullName,
      email: tokenPayload.email,
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: FormSchema) => {
    if (rateLimitExceeded("SignUp")) {
      const rateLimitMessage = rateLimit_defaultErrorMessage("SignUp");
      setError(rateLimitMessage);
      return;
    }

    setError(undefined);
    setLoading(true);

    const response = await server.auth.signUp({
      user: {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      },
      token: token,
    });

    setLoading(false);

    if (response.success) {
      toast.success(response.message);
      router.push(pages.public.signIn.url);
    } else {
      setError(response.message);
    }
  };

  return (
    <>
      <FormError />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4 mb-4">
            <StringField
              label="Full name"
              placeholder="John Doe"
              name="fullName"
              control={form.control}
              isReadOnly
            />
            <StringField
              label="Email"
              placeholder="john.doe@example.com"
              name="email"
              control={form.control}
              isReadOnly
            />
            <StringField
              label="Password"
              placeholder="********"
              type="password"
              name="password"
              control={form.control}
            />
            <StringField
              label="Confirm password"
              placeholder="********"
              type="password"
              name="confirmPassword"
              control={form.control}
            />
            <CheckboxField
              label="I agree to the terms of service."
              name="agreeToToS"
              control={form.control}
            />
          </div>
          <FormSubmitButton>Sign Up</FormSubmitButton>
        </form>
      </Form>
    </>
  );
};
