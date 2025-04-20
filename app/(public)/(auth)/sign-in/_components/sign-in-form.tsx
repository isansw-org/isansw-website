"use client";

import { FormError, FormSubmitButton } from "@/components/form";
import { StringField } from "@/components/form/fields";
import { Form } from "@/components/ui/form";
import { useFormStore } from "@/hooks/use-form-store";
import {
  rateLimit_defaultErrorMessage,
  rateLimitExceeded,
} from "@/lib/security/ratelimit";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "Password is required." }),
});

type FormSchema = z.infer<typeof formSchema>;

export const SignInForm = () => {
  const { setError, setLoading } = useFormStore();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormSchema) => {
    if (rateLimitExceeded("SignIn")) {
      const rateLimitMessage = rateLimit_defaultErrorMessage("SignIn");
      setError(rateLimitMessage);
      return;
    }

    setError(undefined);
    setLoading(true);

    // action

    setLoading(false);
  };

  return (
    <>
      <FormError />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4 mb-4">
            <StringField
              label="Email"
              placeholder="john.doe@example.com"
              name="email"
              control={form.control}
            />
            <StringField
              label="Password"
              placeholder="********"
              name="password"
              type="password"
              control={form.control}
            />
          </div>
          <FormSubmitButton>Sign In</FormSubmitButton>
        </form>
      </Form>
    </>
  );
};
